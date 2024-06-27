// import tokenGenerator from './controllers/token-generator-dev';
import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dossierMedical from './src/routes/medicalRoutes'

const app = express();
const portHost = config.HOST;
const API_URL = config.API;
const connectDB = require("./connectionMedicalDb");

app.use(bodyParser.json());
connectDB();
///// 1
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", API_URL); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   }
// );

///// 2
app.use(cors());
app.use(dossierMedical);


app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('medical');
});

app.listen(portHost);
