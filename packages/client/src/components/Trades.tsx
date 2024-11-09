import React from 'react';
import '../styles/trades.scss';
import useAuthStore from './isAuthenticated';

const Trades = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div>Trades</div>
    );
  }
  return (
    <div>False Trade </div>
  )
}

export default Trades;