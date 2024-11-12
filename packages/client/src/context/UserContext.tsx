import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const USER_ID_SECRET_KEY = process.env.REACT_APP_USER_ID_SECRET_KEY || 'secret'

interface UserContextType {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState<number>(() => {
    const encryptedUserId = localStorage.getItem('userId');
    if (encryptedUserId) {
      const bytes = CryptoJS.AES.decrypt(encryptedUserId, USER_ID_SECRET_KEY);
      const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedUserId ? parseInt(decryptedUserId) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (userId !== 0) {
      const encryptedUserId = CryptoJS.AES.encrypt(userId.toString(), USER_ID_SECRET_KEY).toString();
      localStorage.setItem('userId', encryptedUserId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
