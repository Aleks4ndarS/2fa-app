import React, { useState } from 'react';
import { Form, Input, Button, Alert, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (username && password) {
      dispatch(addUser({ username, password }));
      notification.success({
        message: 'Account Created',
        description: 'Your account has been successfully created.',
      });
      navigate('/dashboard');
    } else {
      setError('All fields are required');
    }
  };

  const redirectBack = () => {
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '25%' }}>
        <Form onFinish={handleSubmit}>
          {error && <Alert message={error} type="error" showIcon />}
          <Form.Item label="Username">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <Button block type="default" onClick={redirectBack}>Back</Button>
              <Button block type="primary" htmlType="submit">Register</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
};

export default RegisterForm;