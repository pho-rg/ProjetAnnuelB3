import express from 'express';
import {personnelAdmingetOne} from "../controllers/personnelAdmin-controllers";
import {dossierAdmingetOne, dossierAdminPatch, dossierAdminPost} from "../controllers/dossierAdmin-controllers";
import {mutuelleGetAll} from "../controllers/mutuelle-controllers";

const router = express.Router();


//Personnels
router.get('/persAdmin/:id', personnelAdmingetOne);



//Dossiers
router.get('/dossAdmin/:id', dossierAdmingetOne);
router.post('/dossAdmin/post', dossierAdminPost);
router.patch('/dossAdmin/patch/:id', dossierAdminPatch);
router.get('/mutuelle/getAll/',mutuelleGetAll);

export = router;
