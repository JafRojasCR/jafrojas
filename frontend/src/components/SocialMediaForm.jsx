import { useState, useEffect } from 'react';
import { socialMediaService } from '../services/socialMediaService';
import './Forms.css';

function SocialMediaForm({ socialMedia, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    url: '',
    displayName: '',
    icon: '',
    order: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (socialMedia) {
      setFormData(socialMedia);
    }
  }, [socialMedia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (socialMedia) {
        await socialMediaService.updateSocialMedia(socialMedia._id, formData);
      } else {
        await socialMediaService.createSocialMedia(formData);
      }
      
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save social media link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit} className="form">
        <h3>{socialMedia ? 'Edit Social Media' : 'Add New Social Media'}</h3>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="platform">Platform *</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="github">GitHub</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="My Instagram"
          />
        </div>

        <div className="form-group">
          <label htmlFor="icon">Icon (optional)</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Emoji or icon class"
          />
        </div>

        <div className="form-group">
          <label htmlFor="order">Display Order</label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SocialMediaForm;
