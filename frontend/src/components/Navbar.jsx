import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          Jafet Rojas
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className={location.pathname === '/portfolio' ? 'nav-link active' : 'nav-link'}
          >
            Portfolio
          </Link>
          {isAuthenticated ? (
            <Link 
              to="/admin" 
              className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}
            >
              Admin
            </Link>
          ) : (
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
