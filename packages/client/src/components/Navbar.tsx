import '../styles/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import temtem_icon from '../assets/images/temtem_icon.png'
import { useMutation } from '@tanstack/react-query';
import useUserIdStore from './userId';

const Navbar = () => {
  const userId = useUserIdStore((state) => state.userId);
  const setUserId = useUserIdStore((state) => state.setUserId);


  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3001/api/user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) {
        console.log('Logout Failed');
        return;
      }

      setUserId(0);
      console.log("User Logged Out");
    }
  })

  const handleLogout = () => {
    logout();
  }

  if (userId === 0) {
    //Logged out render
    return (
      <nav className="navbar">
        <a href='/' className="logo">
          <img src={temtem_icon} alt="Temtem Lite Logo" height={150} width={150}></img>
        </a>
        <ul className="nav-links">
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    );
  } else {

    //Logged in Render
    return (
      <nav className="navbar">
        <a href='/' className="logo">
          <img src={temtem_icon} alt="Temtem Lite Logo" height={150} width={150}></img>
        </a>
        <ul className="nav-links">
          <li><a href="/trades">Trades</a></li>
          <li><a href="/combats">Combats</a></li>
          <li><a href="/profile">Profile</a></li>
          <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
          </div>
        </ul>
      </nav>
    );
  }
};

export default Navbar;