// Page de création d'un nouveau patient
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert} from "@mui/material";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import '../style/PatientRegister.css';
import PatientInfo from "../components/PatientInfo";

const PatientRegister = (props) => {
    //_____Variable_____//
    const navigate = useNavigate();
    const {currentPatientNIR} = useParams();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [adminFileExists, setAdminFileExists] = useState(false);

    // Si les dossiers admin et médical existe pour ce patient, on redirige vers patient-overview
    useEffect(() => {
        // Vérification de l'existence du dossier administratif
        const checkBothFilesExists = async () => {
            try {
                // Status 200 pour trouvé et non trouvé ; res.data.exists à true ou false
                const getRes = await searchService.getAdminFileExists(currentPatientNIR);
                if (getRes.data.exists) {
                    setAdminFileExists(true);
                    // Vérification du dossier médical
                    try {
                        // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                        const getResMed = await searchService.getMedicalFileExists(currentPatientNIR);
                        if (getResMed.data.exists) {
                            // Si le dossier médical existe, on dirige vers la page du patient
                            navigate(`/patient-overview/${currentPatientNIR}`);
                            // TODO avoid reload
                            window.location.reload();
                        }
                    } catch (err) {
                        setAlertMessage("Une erreur est survenue à la vérification du dossier médical.");
                        setAlertOpen(true);
                    }
                }
            } catch (err) {
                setAlertMessage("Une erreur est survenue à la vérification du dossier administratif.");
                setAlertOpen(true);
            }
        };

        checkBothFilesExists();
    }, [currentPatientNIR, navigate]);

    //_____Evennement_____//
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    //_____Affichage_____//
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
            {adminFileExists &&
                <div className="PatientInfoContainer">
                    <PatientInfo nir={currentPatientNIR} type="create" setAlertOpen={setAlertOpen}
                                 setAlertMessage={setAlertMessage}/>
                </div>
            }
        </div>
    );
};

export default PatientRegister;