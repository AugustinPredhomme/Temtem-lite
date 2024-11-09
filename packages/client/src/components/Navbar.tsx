import React from 'react';
import '../styles/navbar.scss';
import useAuthStore from './isAuthenticated';

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <a href='/' className="logo">
          <img src="../assets/images/temtem_icon.png" alt="Temtem Lite Logo"></img>
          <p>Temtem-Lite</p>
        </a>
        <ul className="nav-links">
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <a href='/' className="logo">
        <img src="../assets/images/temtem_icon.png" alt="Temtem Lite Logo"></img>
        <p>Temtem-Lite</p>
      </a>
      <ul className="nav-links">
        <li><a href="/trades">Trades</a></li>
        <li><a href="/combats">Combats</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;