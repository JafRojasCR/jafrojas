import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import './Forms.css';

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    imageUrl: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(', ') 
          : ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map(t => t.trim())
          .filter(t => t)
      };

      if (project) {
        await projectService.updateProject(project._id, dataToSend);
      } else {
        await projectService.createProject(dataToSend);
      }
      
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit} className="form">
        <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Short Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="technologies">Technologies (comma-separated)</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="liveUrl">Live Demo URL</label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
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

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Project
          </label>
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

export default ProjectForm;
