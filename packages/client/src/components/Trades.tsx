import React from 'react';
import '../styles/trades.scss';
import { useUser } from '../context/UserContext';

const Trades = () => {
  const { userId } = useUser();
  if (userId !== 0) {
    return (
      <div>Trades</div>
    );
  }
  return (
    <div>You must be connected to use Trades</div>
  );
}

export default Trades;