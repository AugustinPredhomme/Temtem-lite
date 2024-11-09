import React from 'react';
import '../styles/profile.scss';
import useAuthStore from './isAuthenticated';

const ProfileForm = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div>Profile</div>
    );
  }
  return (
    <div></div>
  );
};

export default ProfileForm;