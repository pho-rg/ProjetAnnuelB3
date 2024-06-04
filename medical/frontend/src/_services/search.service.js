const isNirValid = (nir) => {
    if (nir.length !== 15) {
        return false;
    } else if (!nir.match(/^[0-9]*$/)) {
        return false;
    } else return (97 - (parseInt(nir.substring(0, 13)) % 97) === parseInt(nir.substring(13)));
};
const adminFileExists = (nir) => {
    return true;
    // requete API de vérif si le patient a un dossier administratif
};

const medFileExists = (nir) => {
    return true;
    // requete API de vérif si le patient a un dossier médical
};

const isNameValid = (name) => {
    return (name.length >= 2 && name.length <= 32 && name.match(/^[a-z ,.'-]+$/i));
}
const isDateValid = (date) => {
    if (date.length === 0 || date.match(/\d{4}-\d{2}-\d{2}/)) {
        return (new Date(date) <= new Date());
    } else {
        return false;
    }
}
export const searchService = {
    adminFileExists, medFileExists, isNirValid, isNameValid, isDateValid
}