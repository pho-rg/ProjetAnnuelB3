// Service de gestion des informations du dossier médical
import Axios from './caller.service';

//_____API_____//
// Récupérer un dossier médical
const getMedicalFile = (nir) => {
    return Axios.get('/dossMedical/getOne/'+nir);
}

// Créer un dossier médical
const postMedicalFile = (patientData) => {
    return Axios.post('/dossMedical/post/', patientData);
}

// Modifier un dossier médical
const patchMedicalFile = (patientData) => {
    return Axios.patch('/dossMedical/patch/', patientData);
}

export const patientInfoService = {
    getMedicalFile, postMedicalFile, patchMedicalFile
}