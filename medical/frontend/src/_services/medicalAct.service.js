import Axios from './caller.service';

const isDateValid = (date) => {
    if (date.length === 0) {
        return false;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

const isOldDate = (date) => {
    // Variables de date
    const inputDate = new Date(date);
    const today = new Date();
    const oneWeekAgo = new Date();
    // Calcul de la date une semaine en arrière
    oneWeekAgo.setDate(today.getDate() - 7);

    return inputDate >= oneWeekAgo;
}

const isIntituleValide = (intitule) => {
    return intitule.length > 0;
}

const isNomValide = (intitule) => {
    return intitule.length > 0;
}

const isDescValide = (intitule) => {
    return intitule.length > 0;
}

//_____API_____//
const medFileExists = (nir) => {
    return true;
    // requete API de vérif si le patient a un dossier médical
};

const getMedicalActList = (nir, service) => {
    return Axios.get('/acteMedical?nir='+nir+'&service='+service);
};

const postMedicalAct = (newMedicalActData) => {
    return Axios.post('/acteMedical/post/', newMedicalActData);
}

export const medicalActService = {
    isDateValid, isOldDate, isIntituleValide, isNomValide, isDescValide, medFileExists, getMedicalActList, postMedicalAct
}