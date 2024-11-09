import React from 'react';
import '../styles/hero.scss';
import useUserIdStore from './userId';

const Hero = () => {
  const userId = useUserIdStore((state) => state.userId);
  if (userId === 0) {
    return (
      <section className="hero">
        <h1>Temtem-Lite</h1>
        <p>Simplified Temtem</p>
        <div className="buttons">
          <a href="/register"><button>Register</button></a>
          <a href="/login"><button>Login</button></a>
        </div>
      </section>
    );
  } else {
    return (
      <section className="hero">
        <h1>Temtem-Lite</h1>
        <p>Simplified Temtem</p>
      </section>
    );
  }
};

export default Hero;