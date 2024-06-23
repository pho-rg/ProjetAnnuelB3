import { accountService } from "./account.service";
import Axios from './caller.service';

//_____Controle des champs_____//
const isNomValide = (nom) => {
    if (nom.length < 2) {
        return false;
    } else {
        return nom.match(/^[A-Za-zÀ-ÿ]+(([' -]{1,2}[A-Za-zÀ-ÿ]+)*)$/);
    }
}

const isPrenomValide = (prenom) => {
    if (prenom.length < 2) {
        return false;
    } else {
        return prenom.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);
    }
}

const isDateValide = (date) => {
    if (date.length === 0) {
        return false;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

const isTelephoneValide = (telephone) => {
    if (telephone.length < 3) {
        return false;
    } else {
        return telephone.match(/^[0-9+\-]+$/);
    }
}

const isAdresseValide = (adresse) => {
    return adresse.length > 0;
}

const isEmailValide = (email) => {
    if (email.length < 3) {
        return false;
    } else {
        return email.match(/^\S+@\S+\.\S+$/);
    }
}

const isRemarqueValide = (remarque) => {
    return remarque.length < 1500;
}

//_____API_____//
const getAdminFile = (nir) => {
    return Axios.get('/dossAdmin/'+nir);
}

const patchAdminFile = (patientData) => {
    return Axios.patch('/dossAdmin/patch/'+patientData.num_secu, patientData);
}

export const patientInfoService = {
    isNomValide, isPrenomValide, isDateValide, isTelephoneValide, isAdresseValide,
    isEmailValide, isRemarqueValide, getAdminFile, patchAdminFile
}