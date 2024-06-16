import express from 'express';
import {personnelAdmingetOne} from "../controllers/admin-controllers";

const router = express.Router();

router.get('/persAdmin/', personnelAdmingetOne);

export = router;
