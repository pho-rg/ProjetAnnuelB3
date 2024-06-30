// Service de gestion des infos médicales patient
import Axios from './caller.service';

//_____Controle des champs_____//
// Regex de validation du nom
const isNomValide = (nom) => {
    if (nom.length < 2) {
        return false;
    } else {
        return nom.match(/^[A-Za-zÀ-ÿ]+(([' -]{1,2}[A-Za-zÀ-ÿ]+)*)$/);
    }
}

// Regex de validation du prénom
const isPrenomValide = (prenom) => {
    if (prenom.length < 2) {
        return false;
    } else {
        return prenom.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);
    }
}

// Date saisie dans le passé ou date du jour
const isDateValide = (date) => {
    if (date.length === 0) {
        return false;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

// Regex de téléphone
const isTelephoneValide = (telephone) => {
    if (telephone.length < 3) {
        return false;
    } else {
        return telephone.match(/^[0-9+\-]+$/);
    }
}

// Adresse non vide
const isAdresseValide = (adresse) => {
    return adresse.length > 0;
}

// Regex de validité de l'email
const isEmailValide = (email)=> {
    if (email.length < 3) {
        return false;
    } else {
        return email.match(/^\S+@\S+\.\S+$/);
    }
}

// Remarque vide ou inférieure à 1500 caractères
const isRemarqueValide = (remarque) => {
    return remarque.length < 1500;
}

//_____API_____//
// Récupérer la liste de mutuelles
const getAllMutuelle = (mutuelleList) => {
    return Axios.get('mutuelle/getAll', mutuelleList);
}

// Récupérer un dossier administratif
const getAdminFile = (nir) => {
    return Axios.get(`/dossAdmin/getOne/${nir}`);
}

// Créer un dossier administratif
const postAdminFile = (patientData) => {
    return Axios.post('/dossAdmin/post', patientData);
}

// Modifier un dossier administratif
const patchAdminFile = (patientData) => {
    return Axios.patch(`/dossAdmin/patch/${patientData.num_secu}`, patientData);
}

export const patientInfoService = {
    isNomValide, isPrenomValide, isDateValide, isTelephoneValide, isAdresseValide,
    isEmailValide, isRemarqueValide, getAllMutuelle, getAdminFile, postAdminFile, patchAdminFile
}