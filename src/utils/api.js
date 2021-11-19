import axios from 'axios'

const ENDPOINT = "http://localhost:5000";

const api = axios.create({
    baseURL: ENDPOINT
});
export default api;