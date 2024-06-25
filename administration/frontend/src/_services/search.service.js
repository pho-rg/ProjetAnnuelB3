import { accountService } from "./account.service";
import Axios from './caller.service';

const isNirValid = (nir) => {
    // if (nir.length !== 15) {
    //     return false;
    // } else if (!nir.match(/^[0-9]*$/)) {
    //     return false;
    if (!nir.match(/^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}([0-9]{2})$/)) {
        return false;
    } else return (97 - (parseInt(nir.substring(0, 13)) % 97) === parseInt(nir.substring(13)));
};

const isNameValid = (name) => {
    return (name.length >= 2 && name.length <= 32 && name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i));
}
const isDateValid = (date) => {
    if (date.length === 0) {
        return true;
    } else {
        return (new Date(date) <= new Date() && date.match(/\d{4}-\d{2}-\d{2}/));
    }
}

//_____API_____//
const adminFileExistsO = (nir) => {
    return nir !== "104021730625478";
};

const getAdminFileExists = (nir) => {
    return Axios.get('/dossAdmin/exists/' + nir);
};

const adminFileExists = (nir) => {
    return getAdminFileExists(nir)
        .then(res => res.data.exists)
        .catch(err => {
            console.log(err);
            return false;
        });
};

/*const adminFileExists = (nir) => {
    return Axios.get('/dossAdmin/exists/' + nir)
        .then(res => {
            if (res.status === 200) {
                console.log('dossAdmin exists');
                return true;
            } else {
                console.log(res);
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 404) {
                    console.log('404 dossAdmin does not exist');
                    return false;
                } else {
                    console.log('Problème à la vérification');
                }
            }
        });
};*/

const getAdminSearch = (nom, prenom) => {
    return Axios.get('/dossAdmin/search?nom='+nom+'&prenom='+prenom);
};

export const searchService = {
    isNirValid, isNameValid, isDateValid, getAdminFileExists, adminFileExists, getAdminSearch
}