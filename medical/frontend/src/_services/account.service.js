// Service de  gestion de la connexion utilisateur

// Vérification format email
const isEmailValid = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
}

// Vérification des identifiants de connexion
const login = (credentials) => {
    // TODO requete API
    return credentials.email === 'y@y.y' && credentials.password === 'yy';
}

export const accountService = {
    isEmailValid, login
}