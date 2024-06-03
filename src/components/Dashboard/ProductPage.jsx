import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchProducts } from '../../services/services';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description', render: text => text.slice(0, 10) },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
  ];

  return <Table columns={columns} dataSource={products} loading={loading} rowKey="id" />;
};

export default ProductPage;