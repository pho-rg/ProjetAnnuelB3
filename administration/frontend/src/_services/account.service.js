// Service de  gestion de la connexion utilisateur
import Axios from './caller.service'

// Vérification format email
const isEmailValid = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
}

// Vérification des identifiants de connexion
const login = (credentials) => {
    // Appel API
    return Axios.post('/login/', credentials)
}

// Sauvegarder le token
const saveToken = (token) => {
    localStorage.setItem('token', token);
}

const saveEmail = (email) => {
    localStorage.setItem('email', email)
}

// Se déconecter
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
}

// Vérifier la connexion
const isLogged = () => {
    const token = localStorage.getItem('token');
    // faire du token unn booleen pour savoir sa presence ou non
    // si token !== "" alors true
    return !!token;
}

// Récupérer le token
const getToken = () => {
    return localStorage.getItem('token');
}

const getUserInfo = (email) => {
    return Axios.get('/persAdmin/' + email);
}

export const accountService = {
    isEmailValid, login, saveToken, saveEmail, logout, isLogged, getToken, getUserInfo
}