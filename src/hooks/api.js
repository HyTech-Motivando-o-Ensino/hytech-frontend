import axios from 'axios'

const api = axios.create({
    baseURL: 'https://hytech-cesar.sagittax.org/api/'
    // baseURL: 'https://run.mocky.io/v3/6c4872e4-cb36-4035-9981-c284775d7a95'
});
export default api;