import React from 'react';
import '../styles/trades.scss';
import useUserIdStore from './userId';

const Trades = () => {
  const userId = useUserIdStore((state) => state.userId);
  if (userId !== 0) {
    return (
      <div>Trades</div>
    );
  }
  return null;
}

export default Trades;