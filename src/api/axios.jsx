import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hello-yuzv.onrender.com/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
