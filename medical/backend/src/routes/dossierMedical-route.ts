import express from 'express';
import {dossierMedicalGETONE} from "../controllers/dossierMedical-controller";
const router = express.Router();

router.get('/dossierMedical/:nir',dossierMedicalGETONE);

export = router;