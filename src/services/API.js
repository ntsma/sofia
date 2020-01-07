import axios from 'axios';

const API = axios.create({
    baseURL: 'http://sofia.huufma.br/api'

});

export default API;