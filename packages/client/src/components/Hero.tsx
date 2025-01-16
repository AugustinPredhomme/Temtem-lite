import React from 'react';
import '../styles/hero.scss';
import { useUser } from '../context/UserContext';

const Hero = () => {
  const { userId } = useUser();

  return (
    <section className="hero">
      <h1>Temtem-Lite</h1>
      <p>Simplified Temtem</p>
      {userId === 0 && (
      <div className="buttons">
        <a href="/register">
        <button id="register-button" tabIndex={0}>Register</button>
        </a>
        <a href="/login">
        <button id="login-button" tabIndex={0}>Login</button>
        </a>
      </div>
      )}
    </section>
  );
};

export default Hero;
