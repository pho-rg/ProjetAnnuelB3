// Page de création d'un dossier administratif
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert} from "@mui/material";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import '../style/PatientRegister.css';
import PatientInfo from "../components/PatientInfo";

const PatientRegister = (props) => {
    //_____Variables_____//
    const navigate = useNavigate();
    const {currentPatientNIR} = useParams();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    //_____Contrôle_____//
    // Si le dossier admin existe pour ce patient, on redirige vers patient-overview
    useEffect(() => {
        // Vérification de l'existence du dossier administratif
        const checkAdminFileExists = async () => {
            try {
                // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                const getRes = await searchService.getAdminFileExists(currentPatientNIR);
                if (getRes.data.exists) {
                    // Si le dossier existe, on dirige vers la page du patient
                    navigate(`/patient-overview/${currentPatientNIR}`);
                }
            } catch (err) {
                setAlertMessage("Erreur à la vérification du dossier administratif.");
                alertOpen(true);
            }
        };

        checkAdminFileExists();
    }, [currentPatientNIR, navigate]);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    //_____Affichage_____
    return (
        <div className="PatientRegister">
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
                <PatientInfo nir={currentPatientNIR} type="create" setAlertOpen={setAlertOpen}
                             setAlertMessage={setAlertMessage}/>
            </div>
        </div>
    );
};

export default PatientRegister;