import express from 'express';
import {dossierMedicalNirGETONE} from "../controllers/dossierMedical-controller";
const router = express.Router();

router.get('/dossierMedical/:nir',dossierMedicalNirGETONE);

export = router;