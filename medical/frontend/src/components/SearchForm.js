// Composant de recherche
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../style/SearchForm.css';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonIcon from '@mui/icons-material/Person';
import {Button, TextField} from "@mui/material";
import {searchService} from "../_services/search.service";

const SearchForm = (props) => {
    //_____Variables_____//
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        nir:"",
        nom:"",
        prenom:"",
        date:""
    });

    //_____Evènement_____//
    const handleChange = (event) => {
        if (controlChange(event)) { // contrôles de saisie
            props.setAlertOpen(false); // masquage de l'alerte erreur
            setSearchData({
                ...searchData,
                [event.target.name] : event.target.value
            });
        }
    };
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
    const handleAccess = async () => {
        // Contrôle validité nir et existence du dossier administratif
        if (!searchService.isNirValid(searchData.nir)) {
            props.setAlertMessage("Le numéro NIR renseigné est invalide.");
            props.setAlertOpen(true);
            return;
        }

        // Vérification de l'existence du dossier administratif
        try {
            // Status 200 pour trouvé et non trouvé ; res.data.exists à true ou false
            const getResAdmin = await searchService.getAdminFileExists(searchData.nir);
            if (getResAdmin.data.exists) {
                // Vérification du dossier médical
                try {
                    // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                    const getResMed = await searchService.getMedicalFileExists(searchData.nir);
                    if (getResMed.data.exists) {
                        // Si le dossier médical existe, on dirige vers la page du patient
                        navigate(`/patient-overview/${searchData.nir}`);
                        // TODO fix bug
                        window.location.reload();
                    } else {
                        // Si le dossier médical n'existe pas, on dirige vers la page de création du dossier médical
                        navigate(`/patient-register/${searchData.nir}`);
                        // TODO fix bug
                        window.location.reload();
                    }
                } catch (err) {
                    console.log(err)
                    props.setAlertMessage("Erreur à la vérification du dossier médical.");
                    props.setAlertOpen(true);
                }
            } else {
                console.log("admin not exist " + getResAdmin.data.exists);
                props.setAlertMessage("Aucun dossier administratif n'existe pour ce numéro NIR, il doit être créé avant l'ouverture d'un dossier médical.");
                props.setAlertOpen(true);
            }
        } catch (err) {
            console.log(err)
            props.setAlertMessage("Erreur à la vérification du dossier administratif.");
            props.setAlertOpen(true);
        }

        /*try {
            const adminExists = await searchService.adminFileExists(searchData.nir);
            // Savoir si un dossier administratif existe
            if (!adminExists) {
                console.log("admin does not exist");
                props.setAlertMessage("Aucun dossier administratif n'existe pour ce numéro NIR, il doit être créé avant l'ouverture d'un dossier médical.");
                props.setAlertOpen(true);
            }
            // Le dossier administratif existe, savoir si le dossier médical existe
            else {
                const medicalExists = await searchService.medicalFileExists(searchData.nir);
                // Redirection vers création du dossier médical
                if (!medicalExists) {
                    console.log("medical to create");
                    navigate(`/patient-register/${searchData.nir}`);
                    // TODO fix bug
                    window.location.reload();

                } else {
                    console.log("medical exists");
                    navigate(`/patient-overview/${searchData.nir}`);
                    // TODO fix bug
                    window.location.reload();
                }

            }
        } catch (err) {
            console.error(err);
            props.setAlertMessage("Erreur à la vérification du dossier administratif.");
            props.setAlertOpen(true);
        }*/
    }
    const handleSearch = () => {
        // Contrôle de validité des champs de recherche
        if (!searchService.isNameValid(searchData.nom)) {
            props.setAlertMessage("Le nom renseigné est invalide.");
            props.setAlertOpen(true);
        } else if (!searchService.isNameValid(searchData.prenom)) {
            props.setAlertMessage("Le prénom renseigné est invalide.");
            props.setAlertOpen(true);
        } else if (!searchService.isDateValid(searchData.date)) {
            props.setAlertMessage("La date de naissance renseignée est invalide.");
            props.setAlertOpen(true);
            // Redirection vers le résultat de la recherche
        } else {
            navigate(`/search/result/${searchData.nom}/${searchData.prenom}/${searchData.date}`)
            // TODO fix bug
            window.location.reload();
        }
    }

    //_____Fonctions_____//
    const controlChange = (event) => {
        // contrôles de saisie en fonction du champs
        switch (event.target.name) {
            case "nir":
                return (event.target.value.match(/^[0-9]*$/) && event.target.value.length < 16);
            case "nom":
                return (event.target.value.length <= 32 && event.target.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*$/i));
            case "prenom":
                return (event.target.value.length <= 32 && event.target.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*$/i));
            default:
                return true;
        }
    }

    //_____Affichage_____//
    return (
        <div className="SearchForm">
            <div className="searchInputs">
                <div className="nirSearch">
                    <div className="nirSearchItem"><ContactPageIcon fontSize="large" sx={{color:'#204213'}}/></div>
                    <div className="nirSearchItem">
                        <TextField value={searchData.nir}
                                   label="Numéro NIR"
                                   variant="filled"
                                   onChange={handleChange}
                                   name="nir"
                                   onKeyDown={handleKeyDown}
                        /></div>
                    <div className="nirSearchItem">
                        <Button variant="contained"
                                endIcon={<PersonSearchIcon/>}
                                onClick={handleAccess}>
                            Accéder
                        </Button>
                    </div>
                </div>
                <div className="searchSeparator"><span>ou</span></div>
                <div className="nameSearch">
                    <div className="nameSearchItem">
                        <PersonIcon fontSize="large" sx={{color: '#204213'}}/></div>
                        <div className="nameSearchItem">
                            <TextField value={searchData.prenom}
                                       label="Prénom"
                                       variant="filled"
                                       onChange={handleChange}
                                       name="prenom"
                                       onKeyDown={handleKeyDown}/>
                        </div>
                        <div className="nameSearchItem">
                            <TextField value={searchData.nom}
                                       label="Nom de famille"
                                       variant="filled"
                                       onChange={handleChange}
                                       name="nom"
                                       onKeyDown={handleKeyDown}/>
                        </div>
                        <div className="nameSearchItem">
                            <TextField value={searchData.date}
                                       label="Date de naissance"
                                       variant="filled"
                                       type="date"
                                       InputLabelProps={{shrink: true}}
                                       onChange={handleChange}
                                       name="date"
                                       onKeyDown={handleKeyDown}/>
                        </div>
                        <div className="nameSearchItem">
                            <Button variant="contained"
                                    endIcon={<ManageSearchIcon/>}
                                    onClick={handleSearch}>
                                Rechercher
                            </Button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;