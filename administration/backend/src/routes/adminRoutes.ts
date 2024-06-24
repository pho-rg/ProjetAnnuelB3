import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import {personnelAdmingetOne} from "../controllers/personnelAdmin-controllers";
import {
    dossierAdminExist,
    dossierAdmingetOne,
    dossierAdminSearch,
    dossierAdminPatch,
    dossierAdminPost
} from "../controllers/dossierAdmin-controllers";
import {mutuelleGetAll} from "../controllers/mutuelle-controllers";
import {userConnexion} from "../controllers/authAdmin-controllers";
import {checkTokenValid} from "../middleWares/auth-middlewares"


const router = express.Router();
const jwt = jsonwebtoken

//Login
router.post('/login', userConnexion);


//Personnels
router.get('/persAdmin/:email', checkTokenValid, personnelAdmingetOne);


//Dossiers
router.get('/dossAdmin/exists/:id', checkTokenValid, dossierAdminExist)
router.get('/dossAdmin/getOne/:id', checkTokenValid, dossierAdmingetOne);
router.get('/dossAdmin/search', checkTokenValid, dossierAdminSearch);
router.post('/dossAdmin/post', checkTokenValid, dossierAdminPost);
router.patch('/dossAdmin/patch/:id', checkTokenValid, dossierAdminPatch);


//Mutuelles
router.get('/mutuelle/getAll', checkTokenValid, mutuelleGetAll);


//Routes pour medical
router.get('/dossAdmin/getOne/:id', dossierAdmingetOne);

export = router;
