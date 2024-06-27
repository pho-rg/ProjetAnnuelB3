// Page de recherche
import React, {useState} from 'react';
import SearchForm from "../components/SearchForm";
import {Alert} from "@mui/material";

const Search = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    return (
        <div className="Search">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            { alertOpen &&
                <div className="noMedFileAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}
                           sx={{minWidth: '30%'}}>
                        {alertMessage}
                    </Alert>
                </div>
            }
        </div>
    );
};

export default Search;