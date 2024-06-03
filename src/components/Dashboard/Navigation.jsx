import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const is2FAVerified = useSelector((state) => state.auth.is2FAVerified);

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const menuItems = [
    { key: '/dashboard', label: 'Dashboard' },
    is2FAVerified && {
      key: 'sub1',
      label: 'Categories',
      children: [
        { key: '/dashboard/products', label: 'Products' },
        { key: '/dashboard/images', label: 'Images' },
      ],
    },
    { key: '/dashboard/profile', label: 'Profile' },
  ].filter(Boolean);

  return (
    <Sider>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={handleMenuClick} />
    </Sider>
  );
};

export default Navigation;