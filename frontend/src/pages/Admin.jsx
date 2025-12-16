import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { projectService } from '../services/projectService';
import { socialMediaService } from '../services/socialMediaService';
import { adminService } from '../services/adminService';
import { bioService } from '../services/bioService';
import { certificateService } from '../services/certificateService';
import { contactService } from '../services/contactService';
import ProjectForm from '../components/ProjectForm';
import SocialMediaForm from '../components/SocialMediaForm';
import AdminUserForm from '../components/AdminUserForm';
import BioForm from '../components/BioForm';
import CertificateForm from '../components/CertificateForm';
import ContactForm from '../components/ContactForm';
import './Admin.css';

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [bio, setBio] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSocialMedia, setEditingSocialMedia] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showBioForm, setShowBioForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sectionMessage, setSectionMessage] = useState('');

  const loadData = useCallback(async () => {
    try {
      setSectionMessage('');
      if (activeTab === 'projects') {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } else if (activeTab === 'social') {
        const data = await socialMediaService.getAllSocialMedia();
        setSocialMedia(data);
      } else if (activeTab === 'admins') {
        const data = await adminService.getAdmins();
        setAdmins(data);
      } else if (activeTab === 'bio') {
        const data = await bioService.getBio();
        setBio(data);
      } else if (activeTab === 'certificates') {
        const data = await certificateService.getCertificates();
        setCertificates(data);
      } else if (activeTab === 'contact') {
        const data = await contactService.getContacts();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setSectionMessage('Unable to load data right now. Please try again.');
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [activeTab, loadData]);

  useEffect(() => {
    setShowProjectForm(false);
    setShowSocialMediaForm(false);
    setShowAdminForm(false);
    setShowBioForm(false);
    setShowCertificateForm(false);
    setShowContactForm(false);
    setEditingProject(null);
    setEditingSocialMedia(null);
    setEditingAdmin(null);
    setEditingCertificate(null);
    setEditingContact(null);
  }, [activeTab]);

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

  const handleDeleteAdmin = async (id) => {
    if (user?.id === id) {
      alert('You cannot delete your own account while logged in.');
      return;
    }

    if (window.confirm('Remove this admin user? They will lose dashboard access.')) {
      try {
        await adminService.deleteAdmin(id);
        loadData();
      } catch (error) {
        console.error('Error deleting admin:', error);
        setSectionMessage('Could not remove admin. Please try again.');
      }
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Delete this certificate entry?')) {
      try {
        await certificateService.deleteCertificate(id);
        loadData();
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Delete this contact channel?')) {
      try {
        await contactService.deleteContact(id);
        loadData();
      } catch (error) {
        console.error('Error deleting contact:', error);
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

  const handleAdminSaved = () => {
    setShowAdminForm(false);
    setEditingAdmin(null);
    loadData();
  };

  const handleBioSaved = () => {
    setShowBioForm(false);
    loadData();
  };

  const handleCertificateSaved = () => {
    setShowCertificateForm(false);
    setEditingCertificate(null);
    loadData();
  };

  const handleContactSaved = () => {
    setShowContactForm(false);
    setEditingContact(null);
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
          <button
            className={activeTab === 'admins' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('admins')}
          >
            Admins
          </button>
          <button
            className={activeTab === 'bio' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('bio')}
          >
            Bio
          </button>
          <button
            className={activeTab === 'certificates' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
          <button
            className={activeTab === 'contact' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>

        <div className="admin-section">
          {sectionMessage && (
            <div className="section-message error">{sectionMessage}</div>
          )}

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

          {activeTab === 'admins' && (
            <div>
              <div className="section-header">
                <div>
                  <h2>Admin Users</h2>
                  <p className="section-helper">
                    Invite collaborators who need dashboard access. Edit usernames, update email addresses, or rotate passwords when needed.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingAdmin(null);
                    setShowAdminForm(true);
                  }}
                  className="btn-add"
                >
                  + Add Admin
                </button>
              </div>

              {showAdminForm && (
                <AdminUserForm
                  admin={editingAdmin}
                  onSave={handleAdminSaved}
                  onCancel={() => {
                    setShowAdminForm(false);
                    setEditingAdmin(null);
                  }}
                />
              )}

              <div className="items-list">
                {admins.length === 0 ? (
                  <div className="empty-state">No admin accounts yet. Add one to share access.</div>
                ) : (
                  admins.map((adminUser) => (
                    <div key={adminUser.id} className="item-card">
                      <h3>{adminUser.username}</h3>
                      <p className="item-subtitle">{adminUser.email}</p>
                      <p className="item-meta">Added {formatDate(adminUser.createdAt)}</p>
                      <div className="item-actions">
                        <button
                          onClick={() => {
                            setEditingAdmin(adminUser);
                            setShowAdminForm(true);
                          }}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(adminUser.id)}
                          className="btn-delete"
                          disabled={user?.id === adminUser.id}
                        >
                          Delete
                        </button>
                      </div>
                      {user?.id === adminUser.id && (
                        <p className="item-note">You are logged in as this admin.</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'bio' && (
            <div>
              <div className="section-header">
                <div>
                  <h2>Bio Section</h2>
                  <p className="section-helper">
                    Curate the story and portrait displayed on the Bio page. Use newline breaks to separate paragraphs.
                  </p>
                </div>
                <button
                  onClick={() => setShowBioForm(true)}
                  className="btn-add"
                >
                  {bio ? 'Edit Bio' : 'Create Bio'}
                </button>
              </div>

              {showBioForm && (
                <BioForm
                  bio={bio}
                  onSave={handleBioSaved}
                  onCancel={() => setShowBioForm(false)}
                />
              )}

              {bio ? (
                <div className="bio-preview">
                  {bio.imageUrl && (
                    <div className="bio-preview-image">
                      <img src={bio.imageUrl} alt="Portrait preview" />
                    </div>
                  )}
                  <div className="bio-preview-text">
                    {renderBioPreview(bio.content)}
                  </div>
                </div>
              ) : (
                <div className="empty-state">No bio published yet. Click "Create Bio" to add your story and photo.</div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <div className="section-header">
                <div>
                  <h2>Certificates</h2>
                  <p className="section-helper">
                    Publish certifications, courses, or awards. Include issuing organization, a short summary, and an optional image of the credential.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingCertificate(null);
                    setShowCertificateForm(true);
                  }}
                  className="btn-add"
                >
                  + Add Certificate
                </button>
              </div>

              {showCertificateForm && (
                <CertificateForm
                  certificate={editingCertificate}
                  onSave={handleCertificateSaved}
                  onCancel={() => {
                    setShowCertificateForm(false);
                    setEditingCertificate(null);
                  }}
                />
              )}

              <div className="items-list">
                {certificates.length === 0 ? (
                  <div className="empty-state">No certificates have been added yet.</div>
                ) : (
                  certificates.map((certificate) => (
                    <div key={certificate._id} className="item-card">
                      <h3>{certificate.title}</h3>
                      {certificate.organization && (
                        <p className="item-subtitle">{certificate.organization}</p>
                      )}
                      {certificate.description && (
                        <p>{certificate.description}</p>
                      )}
                      {certificate.issuedAt && (
                        <p className="item-meta">Issued {formatDate(certificate.issuedAt)}</p>
                      )}
                      <div className="item-actions">
                        <button
                          onClick={() => {
                            setEditingCertificate(certificate);
                            setShowCertificateForm(true);
                          }}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(certificate._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <div className="section-header">
                <div>
                  <h2>Contact Channels</h2>
                  <p className="section-helper">
                    Share official ways to reach you. Add distinct entries for hiring, collaborations, or direct messaging platforms.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingContact(null);
                    setShowContactForm(true);
                  }}
                  className="btn-add"
                >
                  + Add Contact
                </button>
              </div>

              {showContactForm && (
                <ContactForm
                  contact={editingContact}
                  onSave={handleContactSaved}
                  onCancel={() => {
                    setShowContactForm(false);
                    setEditingContact(null);
                  }}
                />
              )}

              <div className="items-list">
                {contacts.length === 0 ? (
                  <div className="empty-state">No contact information has been published yet.</div>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact._id} className="item-card">
                      <h3>{contact.label}</h3>
                      <p className="item-subtitle">{contact.type.toUpperCase()}</p>
                      <p>{contact.value}</p>
                      {contact.url && (
                        <p className="item-meta">Link: {contact.url}</p>
                      )}
                      <div className="item-actions">
                        <button
                          onClick={() => {
                            setEditingContact(contact);
                            setShowContactForm(true);
                          }}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;

const formatDate = (value) => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString();
  } catch (error) {
    return value;
  }
};

const renderBioPreview = (content) => {
  if (!content) {
    return null;
  }

  return content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
};
