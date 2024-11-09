import React from 'react';
import '../styles/fights.scss';
import useAuthStore from './isAuthenticated';

const Fights = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {  
    return (
      <div>Fights</div>
    );
  }
  return (
    <div></div>
  );
};

export default Fights;