import React from 'react';
import '../styles/fights.scss';
import { useUser } from '../context/UserContext';

const Fights = () => {
  const { userId } = useUser();
  if (userId !== 0) {  
    return (
      <div>Fights</div>
    );
  }
  return (
    <div>You must be connected to use fights</div>
  );
};

export default Fights;