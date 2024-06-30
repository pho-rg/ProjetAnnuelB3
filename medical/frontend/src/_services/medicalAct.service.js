// Service de gestion des actes médicaux
import Axios from './caller.service';

// Controler la date
const isDateValid = (date) => {
    if (date.length === 0) {
        return false;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

// Accepter une date du jour ou une semaine max en arrière
const isOldDate = (date) => {
    // Variables de date
    const inputDate = new Date(date);
    const today = new Date();
    const oneWeekAgo = new Date();
    // Calcul de la date une semaine en arrière
    oneWeekAgo.setDate(today.getDate() - 7);

    return inputDate >= oneWeekAgo;
}

// Intitulé obligatoirement non vide
const isIntituleValide = (intitule) => {
    return intitule.length > 0;
}

// Nom médecin obligatoirement non vide
const isNomValide = (intitule) => {
    return intitule.length > 0;
}

// Description obligatoirement non vide
const isDescValide = (intitule) => {
    return intitule.length > 0;
}

//_____API_____//
// Récupérer la liste des actes médicaux pour un patient selon le service
const getMedicalActList = (nir, service) => {
    return Axios.get(`/acteMedical?nir=${nir}&service=${service}`);
};

// Créer un acte médical
const postMedicalAct = (newMedicalActData) => {
    return Axios.post('/acteMedical/post/', newMedicalActData);
}

export const medicalActService = {
    isDateValid, isOldDate, isIntituleValide, isNomValide, isDescValide, getMedicalActList, postMedicalAct
}