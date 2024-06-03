import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import TemperatureConverter from './TemperatureConverter';
import ProductPage from './ProductPage';
import ImagePage from './ImagePage';
import ProfilePage from '../../pages/ProfilePage';
import NavBar from './NavBar';

const { Content } = Layout;

const DashboardPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      <Layout>
        <Content style={{ padding: '0 50px', marginTop: '64px' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<TemperatureConverter />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="images" element={<ImagePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;