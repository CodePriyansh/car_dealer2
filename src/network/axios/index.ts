import axios from 'axios';
import Cookies from 'universal-cookie';
import { createAndSignApiKey } from '../../utils/apiKey';

const cookies = new Cookies();
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET; // Ensure this environment variable is set

console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "public");

const instance = axios.create({
  baseURL: 'http://192.168.29.165:8000/', // Replace with your API base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here
    let token = cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add the signed API key to the headers
    console.log(API_SECRET)
    const apiKey = createAndSignApiKey(API_SECRET);
    config.headers['X-API-KEY'] = apiKey;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
