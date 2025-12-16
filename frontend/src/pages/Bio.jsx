import { useEffect, useState } from 'react';
import { bioService } from '../services/bioService';
import './Bio.css';

function Bio() {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBio = async () => {
      try {
        const data = await bioService.getBio();
        setBio(data);
      } catch (err) {
        setError('Unable to load bio at the moment.');
      } finally {
        setLoading(false);
      }
    };

    loadBio();
  }, []);

  if (loading) {
    return <div className="page-loading">Loading bio...</div>;
  }

  if (error) {
    return <div className="page-error">{error}</div>;
  }

  if (!bio) {
    return (
      <div className="bio empty">
        <h1>About Me</h1>
        <p>The bio section has not been published yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="bio">
      <div className="bio-header">
        <h1>About Me</h1>
      </div>
      <div className="bio-content">
        {bio.imageUrl && (
          <div className="bio-image">
            <img src={bio.imageUrl} alt="Portrait" />
          </div>
        )}
        <div className="bio-text" dangerouslySetInnerHTML={{ __html: formatBioContent(bio.content) }} />
      </div>
    </div>
  );
}

const formatBioContent = (content) => {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join('');
};

export default Bio;
