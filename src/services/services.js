import axios from 'axios';

const BASE_URL_PRODUCTS = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(BASE_URL_PRODUCTS);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const BASE_URL_IMAGES = 'https://dummyimage.com/'

export const generateImage = async ({ width, height, text }) => {
  try {
    const response = await axios({
      url: `${BASE_URL_IMAGES}${width}x${height}/000/fff&text=${text}`,
      method: 'GET',
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'image/png' });
    const generatedImageUrl = URL.createObjectURL(blob);
    return generatedImageUrl;
  } catch (error) {
    console.error('Failed to generate image', error);
    throw error;
  }
};