import { Schema, model, connect, Mongoose } from "mongoose";
import * as config from "../../config.json";
import { User } from "../models/testMongoDB-model";
import express, { response } from "express";
import { ifError } from "assert";
import { error } from "console";

const mongoDB = "mongodb://127.0.0.1/";
let mongoose = new Mongoose();
mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(mongoDB);
}

const nouvelUtilisateurPOST = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction) => {
  try {
    // 4. Connect to MongoDB
    await connect(config.MOGODB_URL);

    const user = new User({
      name: "henri",
      email: "bill@initech.com",
      avatar: "https://i.imgur.com/dM7Thhn.png",
    });
    await user.save();
    const user2 = new User({
      name: "Victor",
      email: "bill@initech.com",
      avatar: "https://i.imgur.com/dM7Thhn.png",
    });
    await user2.save();
    console.log(user.email); // 'bill@initech.com'
    return response.status(201).status(201).send({message: "Un nouvel utilisateur prédéfini a été ajouté avec succès !"})
  } catch (error) {

    console.log(error);
  }
};

const utilisateurGET = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  await connect(config.MOGODB_URL);
  User.find({}).exec().then((result) => {
    console.log(result);
    return response.status(200).send(result);
  }).catch(error => {
    return response.status(405).send(error);
  });
  console.log("");
};

const utilisateurUniqueGETONE = async(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params
   const id = params.id
  await connect(config.MOGODB_URL);
  User.findOne({"_id" : id}).exec().then((result) => {
    console.log(result);
    return response.status(200).send(result);
  }).catch(error => {
    return response.status(400).send(error);
  });
  } catch (error) {
    return response.status(400).send(error);
  }
}

const utilisateurPATCH = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body
    await connect(config.MOGODB_URL);
    response.status(200).send(body)
    User.updateOne({"_id": body.id}, new User()).exec().then((result) =>{
      console.log(result)
      return response.status(200).send("result");
    }).catch((error) => {
      return response.status(400).send(error);
    });
  } catch (error) {
    // return response.status(400).send(error);
  }

}

const utilisateurDELETEONE = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params
   const id = params.id
  await connect(config.MOGODB_URL);
  User.deleteOne({"_id" : id}).exec().then((result) => {
    console.log(result);
    return response.status(200).send(result);
  }).catch(error => {
    return response.status(400).send(error);
  });
  } catch (error) {
    return response.status(400).send(error);
  }
}

export { utilisateurGET, nouvelUtilisateurPOST, utilisateurUniqueGETONE, utilisateurPATCH, utilisateurDELETEONE };
