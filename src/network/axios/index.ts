import axios from 'axios';
import Cookies from "universal-cookie"
  const cookies = new Cookies();

console.log(process.env.NEXT_PUBLIC_API_BASE_URL,"public")
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/', // Replace with your API base URL
  baseURL: 'http://localhost:8000/', // Replace with your API base URL
  // baseURL: 'http://15.206.145.69:8000/', // Replace with your API base URL
  // baseURL: 'http://192.168.29.165:8000/', // Replace with your API base URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here
    let token = cookies.get('token')

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
