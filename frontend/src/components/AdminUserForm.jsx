import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import './Forms.css';

function AdminUserForm({ admin, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (admin) {
      setFormData({
        username: admin.username,
        email: admin.email,
        password: ''
      });
    }
  }, [admin]);

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
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim()
      };

      const passwordValue = formData.password.trim();
      if (!admin || passwordValue) {
        payload.password = passwordValue;
      }

      if (admin) {
        await adminService.updateAdmin(admin.id, payload);
      } else {
        if (!payload.password) {
          throw new Error('Password is required for new admins.');
        }
        await adminService.createAdmin(payload);
      }

      onSave();
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to save admin user';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{admin ? 'Edit Admin User' : 'Invite Admin User'}</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{admin ? 'Password (leave blank to keep current)' : 'Temporary Password *'}</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={admin ? '••••••••' : 'Choose a secure password'}
            {...(admin ? {} : { required: true })}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Admin'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUserForm;
