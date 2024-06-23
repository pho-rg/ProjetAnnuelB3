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
const adminFileExists = (nir) => {
    return nir !== "104021730625478";
    //Axios.get('/dossAdmin/exist/' + nir)
    //    .then(res => {
    //        return res.data === true;
    //    })
    //    .catch(err => {
    //        console.log(err);
    //        return false;
    //    });
};


export const searchService = {
    isNirValid, isNameValid, isDateValid, adminFileExists
}