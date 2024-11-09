import React from 'react';
import '../styles/profile.scss';
import useAuthStore from './isAuthenticated';

const ProfileForm = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
      <div>Profile</div>
    );
};

export default ProfileForm;