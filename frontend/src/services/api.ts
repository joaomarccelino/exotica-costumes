import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-exotica.herokuapp.com/product/',
});

export default api;