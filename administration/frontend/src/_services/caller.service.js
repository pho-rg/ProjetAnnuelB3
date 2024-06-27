import axios from 'axios';
import {accountService} from "./account.service";

const Axios = axios.create({
    baseURL: 'http://localhost:5001'
})

// Intercepteur du token
Axios.interceptors.request.use(request => {
   if (accountService.isLogged()) {
       request.headers.Authorization = 'Bearer ' + accountService.getToken();
   }
    return request;
});

export default Axios;