import express from 'express';
import { utilisateurGET, nouvelUtilisateurPOST, utilisateurUniqueGETONE, utilisateurPATCH, utilisateurDELETEONE } from '../controllers/testMongoDB-controller';
const router = express.Router();

router.post('/test', nouvelUtilisateurPOST)
router.get('/test', utilisateurGET)
router.get('/test/utilisateur/:id', utilisateurUniqueGETONE)
router.patch('/test/utilisateur', utilisateurPATCH)
router.delete('/test/utilisateur/:id', utilisateurDELETEONE)

export = router