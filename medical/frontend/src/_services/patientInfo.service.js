import Axios from './caller.service';

//_____API_____//
const getMedicalFile = (nir) => {
    return Axios.get('/dossierMedical/'+nir);
}

export const patientInfoService = {
    getMedicalFile
}