import Axios from './caller.service';

//_____API_____//
const getMedicalFile = (nir) => {
    return Axios.get('/dossMedical/getOne/'+nir);
}

const postMedicalFile = (patientData) => {
    return Axios.post('/dossMedical/post/', patientData);
}

const patchMedicalFile = (patientData) => {
    return Axios.patch('/dossMedical/patch/', patientData);
}

export const patientInfoService = {
    getMedicalFile, postMedicalFile, patchMedicalFile
}