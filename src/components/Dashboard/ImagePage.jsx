import React, { useState } from 'react';
import { Input, Button, Form, notification, InputNumber } from 'antd';
import { generateImage } from '../../services/services';

const ImagePage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const generatedImageUrl = await generateImage(values);
      setImageUrl(generatedImageUrl);
    } catch (error) {
      notification.error({
        message: 'Generation Error',
        description: 'Failed to generate image. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '100%', maxWidth: '50%' }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="width"
            label="Width"
            rules={[
              { required: true, message: 'Width must be between 1 and 200.' },
              { type: 'number', min: 1, max: 200 },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={200} />
          </Form.Item>
          <Form.Item
            name="height"
            label="Height"
            rules={[
              { required: true, message: 'Height must be between 1 and 200.' },
              { type: 'number', min: 1, max: 200 },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={200} />
          </Form.Item>
          <Form.Item
            name="text"
            label="Text"
            rules={[
              { required: true, message: 'Please input the text!' },
              { max: 20, message: 'Text must be 20 characters or less.' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>Generate</Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', height: '200px', marginTop: '20px' }}>
          {imageUrl && <img src={imageUrl} alt="Generated img" />}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;