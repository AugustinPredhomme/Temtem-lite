import '../styles/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import temtem_icon from '../assets/images/temtem_icon.png'
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

const Navbar = () => {
  const { userId, setUserId } = useUser();
  const [ error, setError ] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3001/api/user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      setUserId(0);
      console.log("User Logged Out");
    },
    onError: (error: any) => {
      setError(error.message);
      console.error('Logout failed:', error.message);
    }
  });

  const handleLogout = () => {
    setError(null);
    mutation.mutate();
  };


  return (
    <nav className='navbar'>
      <a href='/' className='logo'>
        <img src={temtem_icon} alt='Temtem Lite Logo' height={150} width={150} />
      </a>
      <ul className='nav-links'>
        {userId === 0 ? (
          <>
            <li><a href='/login'>Login</a></li>
            <li><a href='/register'>Register</a></li>
          </>
        ) : (
          <>
            <li><a href='/trades'>Trades</a></li>
            <li><a href='/fights'>Fights</a></li>
            <li><a href='/inventory'>Inventory</a></li>
            <li><a href='/profile'>Profile</a></li>
            <div onClick={handleLogout} className='logout'>
              {mutation.status === 'pending' ? (
                <span>Logging out...</span>
              ) : (
                <FontAwesomeIcon icon={faSignOut} />
              )}
            </div>
          </>
        )}
      </ul>
      {error && <div className="error-message">{error}</div>}
    </nav>
  )
};

export default Navbar;