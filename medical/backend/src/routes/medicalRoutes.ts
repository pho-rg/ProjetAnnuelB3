import express from 'express';
import {
    dossierMedicalNirGETONE,
    dossierAdminNirGETONE,
    dossierAdminExists,
    dossierMedicalExists,
    dossierMedicalSearch,
    dossierMedicalPost,
    dossierMedicalPatch
} from "../controllers/dossierMedical-controller";
import {userConnexion} from "../controllers/authMedical-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {serviceGET} from "../controllers/serviceMedical-controller";
import {personnelMedicalgetOne} from "../controllers/perssonelMedical";
import {acteMedicalGetAll,acteMedicalPost} from "../controllers/acteMedical-controllers";

const router = express.Router();

/**Routes pour login*/
router.post('/login/',userConnexion);

/**Routes pour personnels*/
router.get('/persMedical/:email', checkTokenValid, personnelMedicalgetOne);

/**Routes pour les dossiers medicaux*/
router.get('/dossMedical/getOne/:nir',checkTokenValid,dossierMedicalNirGETONE);
router.get('/dossAdmin/getOne/Db/:nir', checkTokenValid, dossierAdminNirGETONE)
router.get('/dossAdmin/exists/Db/:nir', checkTokenValid, dossierAdminExists)
router.get('/dossMedical/exists/Db/:nir', checkTokenValid, dossierMedicalExists)
router.get('/dossMedical/search', checkTokenValid, dossierMedicalSearch);
router.post('/dossMedical/post/',checkTokenValid,dossierMedicalPost);
router.patch('/dossMedical/patch/',checkTokenValid,dossierMedicalPatch);

/**Routes pour les actes medicaux*/
router.get('/acteMedical/',checkTokenValid,acteMedicalGetAll);
router.post('/acteMedical/post/',checkTokenValid,acteMedicalPost);

/**Routes pour les services*/
router.get('/service/',checkTokenValid,serviceGET);

export = router;