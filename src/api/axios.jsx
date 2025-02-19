import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hello-8d2r.onrender.com/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
