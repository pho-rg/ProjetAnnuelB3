// Service de  gestion de la connexion utilisateur
import Axios from "./caller.service";

// Vérifier le format email
const isEmailValid = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
}

// Vérifier les identifiants de connexion
const login = (credentials) => {
    // Appel API
    return Axios.post('/login/', credentials)
}

// Sauvegarder le token
const saveToken = (token) => {
    localStorage.setItem('token', token);
}

// Sauvegarder l'email
const saveEmail = (email) => {
    localStorage.setItem('email', email)
}

// Récupérer le token
const getToken = () => {
    return localStorage.getItem('token');
}

// Récupérer les infos utilisateur
const getUserInfo = (email) => {
    return Axios.get(`/persMedical/${email}`);
}

// Vérifier la connexion
const isLogged = () => {
    const token = localStorage.getItem('token');
    // faire du token unn booleen pour savoir sa presence ou non
    // si token !== "" alors true
    return !!token;
}

// Se déconecter
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
}

export const accountService = {
    isEmailValid, login, saveToken, saveEmail, getToken, getUserInfo, logout, isLogged
}