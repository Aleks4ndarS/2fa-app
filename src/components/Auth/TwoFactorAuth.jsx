import React, { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { verify2FA } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    if (code === localStorage.getItem('2faCode')) {
      dispatch(verify2FA());
      navigate('/dashboard');
    } else {
      setError('Invalid code');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '25%' }}>
        <Form onFinish={handleSubmit}>
          {error && <Alert message={error} type="error" showIcon />}
          <Form.Item label="2FA Code">
            <Input type='number' value={code} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">Continue</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TwoFactorAuth;