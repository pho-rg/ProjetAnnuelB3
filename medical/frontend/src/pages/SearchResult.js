import React, {useEffect, useState} from 'react';
import {searchService} from "../_services/search.service";
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {Alert} from "@mui/material";
import PatientInfo from "../components/PatientInfo";
import "../style/SearchResult.css"

const SearchResult = (props) => {
    //_____Variable_____//
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [searchResultList, setSearchResultList] = useState([]);
    const {nom, prenom, date} = useParams();

    //_____API_____//
    // Appel API pour la liste des nir correspondant a la recherche
    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                const res = await searchService.getMedicalSearch(nom, prenom);
                //console.log(res.data);
                // map la liste d'objet en tableau de nir
                const res_num_secu = res.data.map(obj => obj.num_secu);
                //console.log(res_num_secu);
                setSearchResultList(res_num_secu);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSearchResult();
    }, [nom, prenom]);

    //_____Evenement_____//
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    //_____Affichage_____//
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