import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:8889'
})

export default Axios;