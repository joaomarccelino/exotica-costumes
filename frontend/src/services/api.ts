import axios from 'axios';

const api = axios.create({    
    baseURL: 'https://api.gvnrsbs.com.br',
});

export default api;
