import { useEffect, useState } from 'react';
import { contactService } from '../services/contactService';
import './Contact.css';

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } catch (err) {
        setError('Unable to load contact information right now.');
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  if (loading) {
    return <div className="page-loading">Loading contact information...</div>;
  }

  if (error) {
    return <div className="page-error">{error}</div>;
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Official channels to reach out to me for collaborations, opportunities, or just to say hello.</p>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contact information published yet.</p>
        </div>
      ) : (
        <div className="contact-grid">
          {contacts.map((contact) => (
            <article key={contact._id} className="contact-card">
              <h3>{contact.label}</h3>
              <p className="contact-type">{contact.type}</p>
              <p className="contact-value">{contact.value}</p>
              {contact.url && (
                <a className="contact-action" href={contact.url} target="_blank" rel="noopener noreferrer">
                  Open Link
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contact;
