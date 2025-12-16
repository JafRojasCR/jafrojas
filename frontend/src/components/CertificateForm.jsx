import { useEffect, useState } from 'react';
import { certificateService } from '../services/certificateService';
import './Forms.css';

function CertificateForm({ certificate, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    imageUrl: '',
    issuedAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title || '',
        organization: certificate.organization || '',
        description: certificate.description || '',
        imageUrl: certificate.imageUrl || '',
        issuedAt: certificate.issuedAt ? certificate.issuedAt.slice(0, 10) : ''
      });
    }
  }, [certificate]);

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

    const payload = {
      title: formData.title.trim(),
      organization: formData.organization.trim() || undefined,
      description: formData.description.trim() || undefined,
      imageUrl: formData.imageUrl.trim() || undefined,
      issuedAt: formData.issuedAt || undefined
    };

    try {
      if (certificate) {
        await certificateService.updateCertificate(certificate._id, payload);
      } else {
        await certificateService.createCertificate(payload);
      }
      onSave();
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to save certificate';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{certificate ? 'Edit Certificate' : 'Add Certificate'}</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="organization">Issuing Organization</label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Coursera, FreeCodeCamp, ..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Summary</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Key topics covered or accomplishments"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Certificate Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="issuedAt">Issued Date</label>
          <input
            id="issuedAt"
            name="issuedAt"
            type="date"
            value={formData.issuedAt}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Certificate'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CertificateForm;
