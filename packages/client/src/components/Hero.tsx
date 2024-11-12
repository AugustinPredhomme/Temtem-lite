import '../styles/hero.scss';
import { useUser } from '../context/UserContext';

const Hero = () => {
  const { userId } = useUser();
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