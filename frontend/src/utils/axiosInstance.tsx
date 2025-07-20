import axios from 'axios';
import { getBaseUrl } from '../config/url';

console.log('Base URL:', getBaseUrl());
console.log('API URL:', import.meta.env);

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true // for cookies
});

export default axiosInstance;
