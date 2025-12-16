import { useEffect, useState } from 'react';
import { contactService } from '../services/contactService';
import './Forms.css';

function ContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    label: '',
    type: 'email',
    value: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setFormData({
        label: contact.label || '',
        type: contact.type || 'email',
        value: contact.value || '',
        url: contact.url || ''
      });
    }
  }, [contact]);

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
      label: formData.label.trim(),
      type: formData.type,
      value: formData.value.trim(),
      url: formData.url.trim() || undefined
    };

    try {
      if (contact) {
        await contactService.updateContact(contact._id, payload);
      } else {
        await contactService.createContact(payload);
      }
      onSave();
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to save contact';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{contact ? 'Edit Contact Channel' : 'Add Contact Channel'}</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="label">Label *</label>
          <input
            id="label"
            name="label"
            type="text"
            value={formData.label}
            onChange={handleChange}
            required
            placeholder="Hiring, Partnerships, WhatsApp..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="website">Website</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="value">Value *</label>
          <input
            id="value"
            name="value"
            type="text"
            value={formData.value}
            onChange={handleChange}
            required
            placeholder="hello@jafrojas.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Link (optional)</label>
          <input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
