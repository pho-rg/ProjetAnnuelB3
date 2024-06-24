import express from 'express';
import {dossierMedicalNirGETONE} from "../controllers/dossierMedical-controller";
import {userConnexion} from "../controllers/authMedical-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {getDossierAdmin} from "../services/getDossierAdmin.service.js";

const router = express.Router();


//Personnel Medical
router.post('/login',userConnexion);
router.get('/dossAdmin/getOne/:id',getDossierAdmin)

//Dossier Medical
router.get('/dossierMedical/:nir',checkTokenValid,dossierMedicalNirGETONE);

export = router;