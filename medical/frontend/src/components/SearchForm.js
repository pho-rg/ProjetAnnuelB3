import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../style/SearchForm.css';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonIcon from '@mui/icons-material/Person';
import {Button, TextField} from "@mui/material";
import {searchService} from "../_services/search.service";

const SearchForm = () => {
    const navigate = useNavigate();

    const [searchData, setSearchData] = useState({
        nir:"",
        nom:"",
        prenom:"",
        date:""
    });

    const handleChange = (event) => {
        setSearchData({
            ...searchData,
            [event.target.name] : event.target.value
        });
    };

    const handleAccess = () => {
        // Contrôle validité et existence du dossier administratif
        if (!searchService.isNirValid(searchData.nir)) {
            // message invalide
            return;
        }
        else if (!searchService.adminFileExists(searchData.nir)) {
            // message dossier inexistant dans admin
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
        if (!searchService.isNameValid(searchData.nom)) {
            // message nom invalide
        } else if (!searchService.isNameValid(searchData.prenom)) {
            // message prenom invalide
        } else if (!searchService.isDateValid(searchData.date)) {
            // message date invalide
        } else {
            navigate(`/search/result/${searchData.nom}/${searchData.prenom}/${searchData.date}`)
        }
    }

    return (
        <div className="SearchForm">
            <div className="NirSearch">
                <div className="NirSearchItem"><ContactPageIcon fontSize="large" sx={{color:'#204213'}}/></div>
                <div className="NirSearchItem">
                    <TextField value={searchData.nir}
                               label="Numéro NIR"
                               variant="filled"
                               onChange={handleChange}
                               name="nir"
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
                               name="nom"/></div>
                <div className="NameSearchItem">
                    <TextField value={searchData.prenom}
                               label="Prénom"
                               variant="filled"
                               onChange={handleChange}
                               name="prenom"/></div>
                <div className="NameSearchItem">
                    <TextField value={searchData.date}
                               label="Date de naissance"
                               variant="filled"
                               type="date"
                               InputLabelProps={{shrink: true}}
                               onChange={handleChange}
                               name="date"/></div>
                <div className="NameSearchItem">
                    <Button variant="contained"
                            endIcon={<ManageSearchIcon/>}
                            onClick={handleSearch}>
                        Rechercher
                    </Button></div>
            </div>
        </div>
    );
};

export default SearchForm;