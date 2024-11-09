import React from 'react';
import '../styles/fights.scss';
import useUserIdStore from './userId';

const Fights = () => {
  const userId = useUserIdStore((state) => state.userId);
  if (userId !== 0) {  
    return (
      <div>Fights</div>
    );
  }
  return (
    <div></div>
  );
};

export default Fights;