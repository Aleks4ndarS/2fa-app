import React from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../features/authSlice';
import { update2FA, remove2FA } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUsername = useSelector((state) => state.auth.loggedInUsername);
  const profile = useSelector((state) => {
    const loggedInUser = state.auth.users.find((user) => user.username === loggedInUsername);
    return loggedInUser ? loggedInUser.profile : {};
  });
  const is2FAVerified = useSelector((state) => state.auth.is2FAVerified);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(updateProfile(values));
    notification.success({
      message: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
    if (!is2FAVerified) {
      dispatch(update2FA());
      navigate('/2fa');
      const code = localStorage.getItem('2faCode')
      notification.success({
        message: '2FA Code recieved',
        description: `Your 2FA code is: ${code}`,
      });
    }
  };

  const handleDeactivate2FA = () => {
    dispatch(remove2FA())
    notification.info({
      message: '2FA Deactivated',
      description: 'Two-factor authentication has been deactivated.',
    });
  };

  return (
    <Form form={form} initialValues={profile} onFinish={onFinish}>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input disabled={!!profile?.email} />
      </Form.Item>
      <Form.Item name="country" label="Country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="telephone" label="Telephone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="language" label="Language" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="EN">EN</Select.Option>
          <Select.Option value="MK">MK</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Engineer">Engineer</Select.Option>
          <Select.Option value="Sales">Sales</Select.Option>
          <Select.Option value="Marketing">Marketing</Select.Option>
          <Select.Option value="Support">Support</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {is2FAVerified && (
            <Button
              style={{ maxWidth: '45%' }}
              block danger type="primary"
              onClick={handleDeactivate2FA}
            >
              Deactivate 2FA
            </Button>
          )}
          <Button
            style={{ maxWidth: '45%', marginLeft: 'auto' }}
            block type="primary"
            htmlType="submit"
          >
            {Object.values(profile).some(value => value.trim() !== '') ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;