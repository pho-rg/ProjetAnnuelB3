import express from 'express';
import {
    dossierMedicalNirGETONE,
    dossierAdminExists,
    dossierMedicalExists,
    dossierMedicalSearch
} from "../controllers/dossierMedical-controller";
import {userConnexion} from "../controllers/authMedical-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {serviceGET} from "../controllers/serviceMedical-controller";


const router = express.Router();


//Personnel Medical
router.post('/login/',userConnexion);

//Dossier Medicaux
router.get('/dossMedical/getOne/:nir',checkTokenValid,dossierMedicalNirGETONE);
router.get('/dossAdmin/exists/Db/:nir', checkTokenValid, dossierAdminExists)
router.get('/dossMedical/exists/Db/:nir', checkTokenValid, dossierMedicalExists)
router.get('/dossMedical/search', checkTokenValid, dossierMedicalSearch);


//Services
router.get('/service/',checkTokenValid,serviceGET);
export = router;