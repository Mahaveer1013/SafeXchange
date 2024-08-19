import axios from 'axios';
import { getClientConfig } from './config.mjs';

const api = axios.create({
    baseURL: '',
    withCredentials: false,
});

export { api };