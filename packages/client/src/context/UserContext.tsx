import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const USER_ID_SECRET_KEY = process.env.REACT_APP_USER_ID_SECRET_KEY || 'secret';
const USER_ROLE_SECRET_KEY = process.env.REACT_APP_USER_ROLE_SECRET_KEY || 'roleSecret';

interface UserContextType {
  userId: number;
  role: string;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
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

  const [role, setRole] = useState<string>(() => {
    const encryptedRole = localStorage.getItem('role');
    if (encryptedRole) {
      const bytes = CryptoJS.AES.decrypt(encryptedRole, USER_ROLE_SECRET_KEY);
      const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedRole || '';
    }
    return '';
  });

  useEffect(() => {
    if (userId !== 0) {
      const encryptedUserId = CryptoJS.AES.encrypt(userId.toString(), USER_ID_SECRET_KEY).toString();
      localStorage.setItem('userId', encryptedUserId);
    } else {
      localStorage.removeItem('userId');
    }

    if (role) {
      const encryptedRole = CryptoJS.AES.encrypt(role, USER_ROLE_SECRET_KEY).toString();
      localStorage.setItem('role', encryptedRole);
    } else {
      localStorage.removeItem('role');
    }
  }, [userId, role]);

  return (
    <UserContext.Provider value={{ userId, role, setUserId, setRole }}>
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
