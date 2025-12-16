import { useEffect, useState } from 'react';
import { bioService } from '../services/bioService';
import './Forms.css';

function BioForm({ bio, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    imageUrl: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bio) {
      setFormData({
        imageUrl: bio.imageUrl || '',
        content: bio.content || ''
      });
    }
  }, [bio]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bioService.saveBio({
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim() || undefined
      });
      onSave();
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to save bio';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{bio ? 'Update Bio' : 'Create Bio'}</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="imageUrl">Portrait Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://..."
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Bio Content *</label>
          <textarea
            id="content"
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            placeholder="Introduce yourself, highlight experience, and share your story."
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Bio'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BioForm;
