import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessTocken')}`,
  },
});
console.log(localStorage.getItem('accessTocken'));

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessTocken'
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
