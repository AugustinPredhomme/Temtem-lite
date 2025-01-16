import '../styles/resources.scss';
import { useUser } from '../context/UserContext';

const Resources = () => {
  const { userId } = useUser();

  return (
    <section className="resources">
      <h2>Resources</h2>
      <ul>
      <li><a href="/" tabIndex={0}>Blog</a></li>
      <li><a href="/wiki" tabIndex={0}>Wiki</a></li>
      <li><a href="/" tabIndex={0}>Support</a></li>
      <li><a href="/" tabIndex={0}>Developer Team</a></li>
      {userId !== 0 ? (
        <>
        <li><a href="/fights" tabIndex={0}>Fights</a></li>
        <li><a href="/trades" tabIndex={0}>Trades</a></li>
        </>
      ) : (
        <p className="login-prompt" tabIndex={0}>Log in to access more resources like Fights and Trades!</p>
      )}
      </ul>
    </section>
  );
};

export default Resources;
