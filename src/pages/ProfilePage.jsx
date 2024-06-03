import React from 'react';
import ProfileForm from '../components/Profile/ProfileForm';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '60%',
      margin: 'auto',
    }}>
      <div style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Profile</h2>
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;