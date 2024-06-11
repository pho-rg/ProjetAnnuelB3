import express from 'express';
import {utilisateurPOST, utilisateurGET, utilisateurGETALL, utilisateurGETPAGINE, utilisateurPATCH, utilisateurDELETEONE} from '../controllers/utilisateur-controller';
const router = express.Router();

router.post('/utilisateur', utilisateurPOST);
router.get('/utilisateur/:nir', utilisateurGET);
router.get('/utilisateur/all', utilisateurGETALL);
router.get('/utilisateur/page/:page/limite/:limite', utilisateurGETPAGINE);
router.patch('/utilisateur', utilisateurPATCH);
router.delete('/utilisateur/:nir', utilisateurDELETEONE);

export = router;

