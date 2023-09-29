import axios from 'axios';

const API = axios.create({
    baseURL: 'https://sofia.telessaude.ufma.br/api'
});

export default API;

