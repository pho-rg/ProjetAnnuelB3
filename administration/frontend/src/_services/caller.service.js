import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:8888'
})

export default Axios;