import React from 'react';
import '../styles/inventory.scss';
import { useUser } from '../context/UserContext';

const Inventory = () => {
  const { userId } = useUser();
  if (userId !== 0) {  
    return (
      <div>Inventory</div>
    );
  }
  return (
    <div>You must be connected to use inventory</div>
  );
};

export default Inventory;