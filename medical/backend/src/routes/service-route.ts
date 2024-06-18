import express from 'express';
import {serviceGET} from "../controllers/serviceMedical-controller";
const router = express.Router();

router.get('/service/:nom',serviceGET);

export = router;