// Service de la page espace patient
import Axios from './caller.service';

//_____API_____//
// Récupérer la liste des services médicaux
const getAllService = () => {
    return Axios.get('/service/');
}

export const patientSpaceService = {
    getAllService
}