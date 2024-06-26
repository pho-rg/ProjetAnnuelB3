import express from 'express';
import {
    dossierMedicalNirGETONE,
    dossierAdminExists,
    dossierMedicalExists,
    dossierMedicauxSearch,
    dossierMedicalPost
} from "../controllers/dossierMedical-controller";
import {userConnexion} from "../controllers/authMedical-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {serviceGET} from "../controllers/serviceMedical-controller";
import {personnelMedicalgetOne} from "../controllers/personelMedical";
import {acteMedicalGetAll,acteMedicalPost} from "../controllers/acteMedical-controllers";


const router = express.Router();


//Personnel Medical
router.post('/login/',userConnexion);
router.get('/persMedical/:email', checkTokenValid, personnelMedicalgetOne);

//Dossier Medicaux
router.get('/dossierMedical/:nir',checkTokenValid,dossierMedicalNirGETONE);
router.get('/dossAdmin/exists/Db/:nir', checkTokenValid, dossierAdminExists)
router.get('/dossMedical/exists/Db/:nir', checkTokenValid, dossierMedicalExists)
router.get('/dossMedicaal/search', checkTokenValid, dossierMedicauxSearch);
router.post('/dossierMedical/post/',checkTokenValid,dossierMedicalPost);


//Actes Medicaux
router.get('/acteMedical/',checkTokenValid,acteMedicalGetAll);
router.post('/acteMedical/post/',checkTokenValid,acteMedicalPost);

//Services
router.get('/service/',checkTokenValid,serviceGET);
export = router;