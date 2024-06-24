import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {Alert} from "@mui/material";
import PatientInfo from "../components/PatientInfo";
import "../style/SearchResult.css"

const SearchResult = (props) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [searchResultList, setSearchResultList] = useState([
        "107102509803594", "108051202210801", "194070502211575"
    ]);
    const {nom, prenom, date} = useParams();

    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    return (
        <div className="SearchResult">
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
            <div className="searchResultList">
                {searchResultList.length > 0 ? (searchResultList.map((patientNir, index) => (
                        <div className="searchResultItem"><PatientInfo key={index} nir={patientNir} type="search"/></div>))
                ) : (<Alert severity="info">Aucun patient ne correspond à votre recherche.</Alert>) }
            </div>
        </div>
    );
};

export default SearchResult;