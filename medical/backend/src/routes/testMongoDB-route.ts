import express from 'express';
import { utilisateurGET, nouvelUtilisateurPOST, utilisateurUniqueGET, utilisateurPATCH } from '../controllers/testMongoDB-controller';
const router = express.Router();

router.post('/test', nouvelUtilisateurPOST)
router.get('/test', utilisateurGET)
router.get('/test/utilisateur/:id', utilisateurUniqueGET)
router.patch('/test/utilisateur', utilisateurPATCH)

export = router