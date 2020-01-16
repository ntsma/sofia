import axios from 'axios';

const API = axios.create({
    baseURL: 'http://plataforma.homolog.huufma.br/api'
});

export default API;