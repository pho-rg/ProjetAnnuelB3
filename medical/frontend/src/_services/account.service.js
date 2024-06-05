const login = (credentials) => {
    // TODO requete API
    return credentials.email === 'y@y.y' && credentials.password === 'yy';
}

export const accountService = {
    login
}