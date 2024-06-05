import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../style/SearchForm.css';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonIcon from '@mui/icons-material/Person';
import {Alert, Button, TextField} from "@mui/material";
import {searchService} from "../_services/search.service";

const SearchForm = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        nir:"",
        nom:"",
        prenom:"",
        date:""
    });
    const [alertMessage, setAlertMessage] = useState("")
    const [alertOpen, setAlertOpen] = useState(false);
    const handleCloseAlert = () => {setAlertOpen(false);}
    const handleChange = (event) => {
        if (controlChange(event)) { // contrôles de saisie
            setAlertOpen(false); // masquage de l'alerte erreur
            setSearchData({
                ...searchData,
                [event.target.name] : event.target.value
            });
        }
    };
    const controlChange = (event) => {
        // contrôles de saisie en fonction du champs
        switch (event.target.name) {
            case "nir":
                return (event.target.value.match(/^[0-9]*$/) && event.target.value.length < 16);
            case "nom":
                return (event.target.value.length <= 32 && event.target.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*$/i))
            case "prenom":
                return (event.target.value.length <= 32 && event.target.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*$/i))
            default:
                return true;
        }
    }
    const handleKeyDown = (event) => {
        // touche entree pressee -> bouton associé activé
        if (event.key === "Enter") {
            if (event.target.name === "nir") {
                handleAccess()
            } else {
                handleSearch()
            }
        }
    }
    const handleAccess = () => {
        // Contrôle validité nir et existence du dossier administratif
        if (!searchService.isNirValid(searchData.nir)) {
            setAlertMessage("Le numéro NIR renseigné est invalide.");
            setAlertOpen(true);
            return;
        }
        else if (!searchService.adminFileExists(searchData.nir)) {
            setAlertMessage("Aucun dossier administratif n'existe pour ce numéro NIR, il doit être créé avant l'ouverture d'un dossier médical.");
            setAlertOpen(true);
            return;
        }
        // Redirection vers la bonne page Patient
        if (!searchService.medFileExists(searchData.nir)) {
            navigate(`/patient-register/${searchData.nir}`);
        } else {
            navigate(`/patient-overview/${searchData.nir}`);
        }
    }
    const handleSearch = () => {
        // Contrôle de validité des champs de recherche
        if (!searchService.isNameValid(searchData.nom)) {
            setAlertMessage("Le nom renseigné est invalide.");
            setAlertOpen(true);
        } else if (!searchService.isNameValid(searchData.prenom)) {
            setAlertMessage("Le prénom renseigné est invalide.");
            setAlertOpen(true);
        } else if (!searchService.isDateValid(searchData.date)) {
            setAlertMessage("La date de naissance renseignée est invalide.");
            setAlertOpen(true);
        // Redirection vers le résultat de la recherche
        } else {
            navigate(`/search/result/${searchData.nom}/${searchData.prenom}/${searchData.date}`)
        }
    }

    return (
        <div className="SearchForm">
            <div className="SearchInputs">
                <div className="NirSearch">
                    <div className="NirSearchItem"><ContactPageIcon fontSize="large" sx={{color:'#204213'}}/></div>
                    <div className="NirSearchItem">
                        <TextField value={searchData.nir}
                                   label="Numéro NIR"
                                   variant="filled"
                                   onChange={handleChange}
                                   name="nir"
                                   onKeyDown={handleKeyDown}
                        /></div>
                    <div className="NirSearchItem">
                        <Button variant="contained"
                                endIcon={<PersonSearchIcon/>}
                                onClick={handleAccess}>
                            Accéder
                        </Button>
                    </div>
                </div>
                <div className="SearchSeparator"><span>ou</span></div>
                <div className="NameSearch">
                <div className="NameSearchItem"><PersonIcon fontSize="large" sx={{color:'#204213'}}/></div>
                <div className="NameSearchItem">
                    <TextField value={searchData.nom}
                               label="Nom"
                               variant="filled"
                               onChange={handleChange}
                               name="nom"
                               onKeyDown={handleKeyDown}/></div>
                <div className="NameSearchItem">
                    <TextField value={searchData.prenom}
                               label="Prénom"
                               variant="filled"
                               onChange={handleChange}
                               name="prenom"
                               onKeyDown={handleKeyDown}/></div>
                <div className="NameSearchItem">
                    <TextField value={searchData.date}
                               label="Date de naissance"
                               variant="filled"
                               type="date"
                               InputLabelProps={{shrink: true}}
                               onChange={handleChange}
                               name="date"
                               onKeyDown={handleKeyDown}/></div>
                <div className="NameSearchItem">
                    <Button variant="contained"
                            endIcon={<ManageSearchIcon/>}
                            onClick={handleSearch}>
                        Rechercher
                    </Button></div>
            </div>
            </div>
            { alertOpen &&
                <div className="SearchAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}
                           sx={{minWidth:'30%'}}>
                        {alertMessage}
                    </Alert>
                </div>
            }
        </div>
    );
};

export default SearchForm;