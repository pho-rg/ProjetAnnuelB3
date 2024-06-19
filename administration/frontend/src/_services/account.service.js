// Service de  gestion de la connexion utilisateur
import Axios from './caller.service'

// Vérification format email
const isEmailValid = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
}

// Vérification des identifiants de connexion
const login = (credentials) => {
    // Appel API
    return Axios.post('/auth/login/', credentials)
}

// Sauvegarder le token
const saveToken = (token) => {
    localStorage.setItem('token', token);
}

// Se déconecter
const logout = () => {
    localStorage.removeItem('token');
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

export const accountService = {
    isEmailValid, login, saveToken, logout, isLogged, getToken
}