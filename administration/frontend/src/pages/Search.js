// Page de recherche
import React, {useState} from 'react';
import SearchForm from "../components/SearchForm";
import {Alert} from "@mui/material";
import '../style/Search.css';

const Search = () => {
    //_____Variables_____//
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    //_____Evenement_____//
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    //_____Affichage_____//
    return (
        <div className="Search">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            { alertOpen &&
                <div className="noMedFileAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}>
                        {alertMessage}
                    </Alert>
                </div>
            }
        </div>
    );
};

export default Search;