import express from 'express';
import {
    dossierMedicalNirGETONE,
    dossierAdminExists,
    dossierMedicalExists,
    dossierMedicalSearch,
    dossierMedicalPost,
    dossierMedicalPatch
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
router.get('/dossMedical/getOne/:nir',checkTokenValid,dossierMedicalNirGETONE);
router.get('/dossAdmin/exists/Db/:nir', checkTokenValid, dossierAdminExists)
router.get('/dossMedical/exists/Db/:nir', checkTokenValid, dossierMedicalExists)
router.get('/dossMedical/search', checkTokenValid, dossierMedicalSearch);
router.post('/dossMedical/post/',checkTokenValid,dossierMedicalPost);
router.patch('/dossMedical/patch/',checkTokenValid,dossierMedicalPatch);

//Actes Medicaux
router.get('/acteMedical/',checkTokenValid,acteMedicalGetAll);
router.post('/acteMedical/post/',checkTokenValid,acteMedicalPost);

//Services
router.get('/service/',checkTokenValid,serviceGET);

export = router;