import Axios from './caller.service';

//_____API_____//
const getMedicalFile = (nir) => {
    return Axios.get('/dossMedical/getOne/'+nir);
}

export const patientInfoService = {
    getMedicalFile
}