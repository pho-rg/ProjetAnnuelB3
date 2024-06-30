// Gestion du port de connexion et du token
import axios from 'axios';
import {accountService} from "./account.service";

// Définir le port d'écoute
const Axios = axios.create({
    baseURL: 'http://localhost:5002'
})

// Intercepteur du token
Axios.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        request.headers.Authorization = `Bearer ${accountService.getToken()}`;
    }

    return request;
});

export default Axios;