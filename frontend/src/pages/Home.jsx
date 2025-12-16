import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socialMediaService } from '../services/socialMediaService';
import './Home.css';

function Home() {
  const [socialMedia, setSocialMedia] = useState([]);

  const loadSocialMedia = async () => {
    try {
      const data = await socialMediaService.getAllSocialMedia();
      setSocialMedia(data);
    } catch (error) {
      console.error('Error loading social media:', error);
    }
  };

  useEffect(() => {
    loadSocialMedia();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Jafet Alonso Rojas Bello</h1>
          <p className="subtitle">Full Stack Developer</p>
          <p className="description">
            Welcome to my personal portfolio! I'm a passionate programmer with expertise
            in building modern web applications. Explore my projects and feel free to connect.
          </p>
          <div className="cta-buttons">
            <Link to="/portfolio" className="btn btn-primary">View Portfolio</Link>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>

      <section id="about" className="about-section">
        <div className="container">
          <h2>About Me</h2>
          <p>
            I'm a dedicated developer passionate about creating innovative solutions
            and building meaningful applications. With experience in modern web technologies,
            I specialize in full-stack development using React, Node.js, and more.
          </p>
        </div>
      </section>

      <section className="social-section">
        <div className="container">
          <h2>Connect With Me</h2>
          <div className="social-links">
            {socialMedia.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.displayName || link.platform}
              >
                <span className="social-icon">{getSocialIcon(link.platform)}</span>
                <span className="social-name">{link.displayName || link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const getSocialIcon = (platform) => {
  const icons = {
    instagram: '📷',
    linkedin: '💼',
    github: '💻',
    twitter: '🐦',
    facebook: '👥',
    other: '🔗'
  };
  return icons[platform] || icons.other;
};

export default Home;
