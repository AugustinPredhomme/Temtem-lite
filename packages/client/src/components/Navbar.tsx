// Navbar.tsx

import '../styles/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';
import temtem_icon from '../assets/images/temtem_icon.png';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { userId, setUserId, setRole } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3001/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      setUserId(0);
      setRole('');
      localStorage.clear();
      console.log('User Logged Out');
    },
    onError: (error: any) => {
      setError(error.message);
      console.error('Logout failed:', error.message);
    },
    onSuccess: () => {
      setMenuOpen(false);
    },
  });

  const handleLogout = () => {
    setError(null);
    mutation.mutate();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.nav-links');
      const menuIcon = document.querySelector('.menu-icon');
      if (menuOpen && sidebar && !sidebar.contains(event.target as Node) && !menuIcon?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <a href="/" className="logo">
        <img src={temtem_icon} alt="Temtem Lite Logo"/>
      </a>
      
      {/* Burger menu icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {userId === 0 ? (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        ) : (
          <>
            <li><a href="/trades">Trades</a></li>
            <li><a href="/fights">Fights</a></li>
            <li><a href="/inventory">Inventory</a></li>
            <li><a href="/profile">Profile</a></li>
            <li onClick={handleLogout} className="logout">
              {mutation.status === 'pending' ? (
                <span>Logging out...</span>
              ) : (
                window.innerWidth < 768 ? 'Logout' : <FontAwesomeIcon icon={faSignOut} />
              )}
            </li>
          </>
        )}
      </ul>
      
      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}
    </nav>
  );
};

export default Navbar;
