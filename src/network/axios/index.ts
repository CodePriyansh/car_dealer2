import axios from 'axios';
console.log(process.env.NEXT_PUBLIC_API_BASE_URL,"public")
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/', // Replace with your API base URL
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
