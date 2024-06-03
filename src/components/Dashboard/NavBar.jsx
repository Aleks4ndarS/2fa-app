import React, { useState } from 'react';
import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import { resetAppState } from '../../actions/actions';
// import { persistor } from '../../store';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const loggedInUsername = useSelector((state) => state.auth.loggedInUsername);

  const handleProfileMenuVisible = (visible) => {
    setProfileMenuVisible(visible);
  };

  const handleMenuClick = (e) => {
    handleProfileMenuVisible(false)
    if (e.key === '/dashboard/profile') {
      navigate(e.key);
    } else {
      dispatch(resetAppState())
      dispatch(logout())
      // persistor.purge() TODO - check not working as expected
    }
  };

  const profileMenuItems = [
    { key: '/dashboard/profile', label: 'Profile' },
    { key: 'logout', label: 'Log Out' }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 10, padding: '10px' }}>
      {loggedInUsername && <span style={{ marginRight: '10px' }}>{loggedInUsername}</span>}
      <Avatar
        size="large"
        icon={<UserOutlined />}
        style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
        onMouseEnter={() => handleProfileMenuVisible(true)}
        onMouseLeave={() => handleProfileMenuVisible(false)}
      />
      {isProfileMenuVisible && (
        <Menu
          style={{ position: 'absolute', top: '40px', right: '0' }}
          onMouseEnter={() => handleProfileMenuVisible(true)}
          onMouseLeave={() => handleProfileMenuVisible(false)}
          items={profileMenuItems}
          onClick={handleMenuClick}
        />
      )}
    </div>
  );
};

export default NavBar;
