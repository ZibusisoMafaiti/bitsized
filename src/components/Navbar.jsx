import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  // State to track if the mobile menu is open (true/false)
  const [isOpen, setIsOpen] = useState(false);
  
  // Hook to get the current URL (so we can highlight the active link)
  const location = useLocation(); 

  // Function to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path ? 'nav-link current' : 'nav-link';

  return (
    <header>
      <div className="container header-content">
        <h1 className="logo">Bitsized</h1>
        
        {/* Mobile Toggle Button */}
        <button 
            className={`menu-toggle ${isOpen ? 'active' : ''}`} 
            aria-label="Toggle Navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <nav className={`main-nav ${isOpen ? 'main-nav-active' : ''}`}>
          <ul>
            <li>
                <Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link>
            </li>
            <li>
                <Link to="/bots" className={isActive('/bots')} onClick={closeMenu}>Bots</Link>
            </li>
            <li>
                <Link to="/about" className={isActive('/about')} onClick={closeMenu}>About us</Link>
            </li>
            <li>
                <Link to="/adventures" className={isActive('/adventures')} onClick={closeMenu}>Adventures</Link>
            </li>
            <li><Link to="/applications" className="nav-link">Applications</Link></li>
            <li>
                <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
