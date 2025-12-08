import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { socialMediaService } from '../services/socialMediaService';
import ProjectForm from '../components/ProjectForm';
import SocialMediaForm from '../components/SocialMediaForm';
import './Admin.css';

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSocialMedia, setEditingSocialMedia] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'projects') {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } else if (activeTab === 'social') {
        const data = await socialMediaService.getAllSocialMedia();
        setSocialMedia(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        loadData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleDeleteSocialMedia = async (id) => {
    if (window.confirm('Are you sure you want to delete this social media link?')) {
      try {
        await socialMediaService.deleteSocialMedia(id);
        loadData();
      } catch (error) {
        console.error('Error deleting social media:', error);
      }
    }
  };

  const handleProjectSaved = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    loadData();
  };

  const handleSocialMediaSaved = () => {
    setShowSocialMediaForm(false);
    setEditingSocialMedia(null);
    loadData();
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleEditSocialMedia = (social) => {
    setEditingSocialMedia(social);
    setShowSocialMediaForm(true);
  };

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-tabs">
          <button
            className={activeTab === 'projects' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={activeTab === 'social' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('social')}
          >
            Social Media
          </button>
        </div>

        <div className="admin-section">
          {activeTab === 'projects' && (
            <div>
              <div className="section-header">
                <h2>Manage Projects</h2>
                <button 
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                  className="btn-add"
                >
                  + Add Project
                </button>
              </div>

              {showProjectForm && (
                <ProjectForm
                  project={editingProject}
                  onSave={handleProjectSaved}
                  onCancel={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                  }}
                />
              )}

              <div className="items-list">
                {projects.map((project) => (
                  <div key={project._id} className="item-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div>
              <div className="section-header">
                <h2>Manage Social Media</h2>
                <button 
                  onClick={() => {
                    setEditingSocialMedia(null);
                    setShowSocialMediaForm(true);
                  }}
                  className="btn-add"
                >
                  + Add Social Media
                </button>
              </div>

              {showSocialMediaForm && (
                <SocialMediaForm
                  socialMedia={editingSocialMedia}
                  onSave={handleSocialMediaSaved}
                  onCancel={() => {
                    setShowSocialMediaForm(false);
                    setEditingSocialMedia(null);
                  }}
                />
              )}

              <div className="items-list">
                {socialMedia.map((social) => (
                  <div key={social._id} className="item-card">
                    <h3>{social.displayName || social.platform}</h3>
                    <p>{social.url}</p>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEditSocialMedia(social)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteSocialMedia(social._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
