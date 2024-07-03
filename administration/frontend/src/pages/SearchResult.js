// Page de résultat de recherche
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {Alert} from "@mui/material";
import PatientInfo from "../components/PatientInfo";
import "../style/SearchResult.css"
import {searchService} from "../_services/search.service";

const SearchResult = (props) => {
    // Blocage du doublon useEffect
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [searchResultList, setSearchResultList] = useState([]);
    const {nom, prenom, date} = useParams();

    // Appel API pour la liste des nir correspondant a la recherche
    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                const res = await searchService.getAdminSearch(nom, prenom, date);
                // map la liste d'objet en tableau de nir
                const res_num_secu = res.data.map((obj) => obj.num_secu);
                setSearchResultList(res_num_secu);
            } catch (err) {
                setAlertMessage("Erreur l'envoi de la recherche");
                setAlertOpen(true);
            }
        };

        fetchSearchResult();
    }, [nom, prenom, date]);

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