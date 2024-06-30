// Service de gestion des informations du dossier médical
import Axios from './caller.service';

//_____API_____//
// Récupérer un dossier administratif (infos admin seulement)
const getAdminFile = (nir) => {
    return Axios.get(`/dossAdmin/getOne/Db/${nir}`);
}

// Récupérer un dossier médical (iinfos admin et médicale)
const getMedicalFile = (nir) => {
    return Axios.get(`/dossMedical/getOne/${nir}`);
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
    getAdminFile, getMedicalFile, postMedicalFile, patchMedicalFile
}