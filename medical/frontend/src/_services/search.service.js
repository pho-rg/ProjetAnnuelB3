// Service de gestion de la recherche
import Axios from './caller.service';

// Test et calcul de la clef de contrôle pour valider un nir saisit
const isNirValid = (nir) => {
    if (!nir.match(/^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}([0-9]{2})$/)) {
        return false;
    } else return (97 - (parseInt(nir.substring(0, 13)) % 97) === parseInt(nir.substring(13)));
};

// Regex de validation d'un nom
const isNameValid = (name) => {
    return (name.length >= 2 && name.length <= 32 && name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i));
}

// La date saisie doit être dans le passé
const isDateValid = (date) => {
    if (date.length === 0) {
        return true;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

//_____API_____//
// Promise d'existence du dossier administratif
const getAdminFileExists = (nir) => {
    return Axios.get('/dossAdmin/exists/Db/' + nir);
};
// True false d'existence du dossier administratif
const adminFileExists = (nir) => {
    return getAdminFileExists(nir)
        .then(res => res.data.exists)
        .catch(err => {
            console.log(err);
            return false;
        });
};

// Promise d'existence du dossier médical
const getMedicalFileExists = (nir) => {
    return Axios.get('/dossMedical/exists/Db/' + nir);
};
// True false d'existence du dossier médical
const medicalFileExists = (nir) => {
    return getMedicalFileExists(nir)
        .then(res => res.data.exists)
        .catch(err => {
            console.log(err);
            return false;
        });
};

// Rechercher par nom et prénom
const getMedicalSearch = (nom, prenom) => {
    return Axios.get('/dossMedical/search?nom='+nom+'&prenom='+prenom);
};

export const searchService = {
    isNirValid, isNameValid, isDateValid, adminFileExists, medicalFileExists, getMedicalSearch
}