// Composant PatientOverview
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';
import PatientInfo from "../components/PatientInfo";

const PatientOverview = () => {
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();

    //_____Contrôle_____//
    // Si le dossier admin n'existe pas pour ce patient, on redirige vers patient-register
    useEffect(() => {
        const checkAdminFileExists = async () => {
            try {
                const exists = await searchService.adminFileExists(currentPatientNIR);
                if (!exists) {
                    navigate(`/patient-register/${currentPatientNIR}`);
                }
            } catch (err) {
                console.error(err);
                setAlertMessage('Erreur à la vérification du dossier administratif.');
                setAlertOpen(true);
            }
        };

        checkAdminFileExists();
    }, [currentPatientNIR, navigate]);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

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
            <div className="PatientInfoContainer"><PatientInfo nir={currentPatientNIR} type="display" /></div>
        </div>
    );
};

export default PatientOverview;