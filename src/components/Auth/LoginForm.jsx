import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { hashPassword } from '../../utils/crypto';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    const hashedPassword = hashPassword(credentials.password);
    dispatch(login({ username: credentials.username, password: hashedPassword }));
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Form onFinish={handleSubmit}>
        {error && <Alert message="Login Failed" type="error" showIcon />}
        <Form.Item label="Username" name="username">
          <Input name="username" value={credentials.username} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password name="password" value={credentials.password} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Button style={{ padding: 0 }} onClick={handleRegisterClick} type="link">create one</Button>
      </p>
    </>
  );
};

export default LoginForm;