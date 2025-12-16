import { useEffect, useState } from 'react';
import { certificateService } from '../services/certificateService';
import './Certificates.css';

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await certificateService.getCertificates();
        setCertificates(data);
      } catch (err) {
        setError('Unable to load certificates right now.');
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  if (loading) {
    return <div className="page-loading">Loading certificates...</div>;
  }

  if (error) {
    return <div className="page-error">{error}</div>;
  }

  return (
    <div className="certificates">
      <div className="certificates-header">
        <h1>Certificates & Achievements</h1>
        <p>A curated list of my certifications, courses, and recognitions.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="empty-state">
          <p>No certificates have been published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <article key={certificate._id} className="certificate-card">
              {certificate.imageUrl && (
                <div className="certificate-image">
                  <img src={certificate.imageUrl} alt={certificate.title} />
                </div>
              )}
              <div className="certificate-body">
                <h3>{certificate.title}</h3>
                <p className="certificate-organization">{certificate.organization}</p>
                {certificate.description && (
                  <p className="certificate-description">{certificate.description}</p>
                )}
                {certificate.issuedAt && (
                  <p className="certificate-issuedAt">
                    Issued {new Date(certificate.issuedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;
