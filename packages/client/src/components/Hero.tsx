import React from 'react';
import '../styles/hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Temtem-Lite</h1>
      <p>Simplified Temtem</p>
      <div className="buttons">
        <button>Register</button>
        <button>Login</button>
      </div>
    </section>
  );
};

export default Hero;