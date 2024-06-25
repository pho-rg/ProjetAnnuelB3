import express from 'express';
import {dossierMedicalNirGETONE} from "../controllers/dossierMedical-controller";
import {userConnexion} from "../controllers/authMedical-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares";


const router = express.Router();


//Personnel Medical
router.post('/login',userConnexion);

//Dossier Medical
router.get('/dossierMedical/:nir',checkTokenValid,dossierMedicalNirGETONE);

export = router;