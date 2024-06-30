// Composant PatientOverview
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';
import PatientInfo from "../components/PatientInfo";

const PatientOverview = () => {
    //_____Variables_____//
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();

    //_____Contrôle_____//
    // Si le dossier admin n'existe pas pour ce patient, on redirige vers patient-register
    useEffect(() => {
        // Vérification de l'existence du dossier administratif
        const checkAdminFileExists = async () => {
            try {
                // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                const getRes = await searchService.getAdminFileExists(currentPatientNIR);
                if (!getRes.data.exists) {
                    // Si le dossier n'existe pas, on dirige vers la page du patient
                    navigate(`/patient-register/${currentPatientNIR}`);
                    // TODO avoid reload
                    window.location.reload();
                }
            } catch (err) {
                setAlertMessage("Erreur à la vérification du dossier administratif.");
                setAlertOpen(true);
            }
        };

        checkAdminFileExists();
    }, [currentPatientNIR, navigate]);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    //_____Affichage_____//
    return (
        <div className="PatientOverview">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            { alertOpen &&
                <div className="noAdminFileAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}
                           sx={{minWidth: '30%'}}>
                        {alertMessage}
                    </Alert>
                </div>
            }
            <div className="PatientInfoContainer">
                <PatientInfo nir={currentPatientNIR} type="display" setAlertOpen={setAlertOpen}
                             setAlertMessage={setAlertMessage}/></div>
        </div>
    );
};

export default PatientOverview;