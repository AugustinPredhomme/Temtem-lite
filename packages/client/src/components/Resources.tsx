import '../styles/resources.scss';
import { useUser } from '../context/UserContext';

const Resources = () => {
  const { userId } = useUser();

  return (
    <section className="resources">
      <h2>Resources</h2>
      <ul>
        <li><a href="/">Blog</a></li>
        <li><a href="/wiki">Wiki</a></li>
        <li><a href="/">Support</a></li>
        <li><a href="/">Developer Team</a></li>
        {userId !== 0 ? (
          <>
            <li><a href="/fights">Fights</a></li>
            <li><a href="/trades">Trades</a></li>
          </>
        ) : (
          <p className="login-prompt">Log in to access more resources like Fights and Trades!</p>
        )}
      </ul>
    </section>
  );
};

export default Resources;
