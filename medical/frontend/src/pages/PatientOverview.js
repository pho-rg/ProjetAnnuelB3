// Page de toutes les infos médicales du patient
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PatientSpace from "../components/PatientSpace";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';

const PatientOverview = () => {
    //_____Variables_____//
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();
    const [medFileExists, setMedFileExists] = useState(false);

    // Si le dossier médical n'existe pas pour ce patient, on redirige vers patient-register
    // Une fois sur le patient-register, le controle de l'existence du dossier administratif est géré
    useEffect(() => {
        // Vérification de l'existence du dossier médical
        const checkMedicalFileExists = async () => {
            try {
                // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                const getRes = await searchService.getMedicalFileExists(currentPatientNIR);
                if (!getRes.data.exists) {
                    setMedFileExists(false);
                    // Si le dossier n'existe pas, on dirige vers la page de création
                    // Le test d'existence du fichier administratif est fait sur la page de création
                    navigate(`/patient-register/${currentPatientNIR}`);
                } else {
                    setMedFileExists(true);
                }
            } catch (err) {
                setAlertMessage("Une erreur est survenue à la vérification du dossier médical.");
                setAlertOpen(true);
            }
        };

        checkMedicalFileExists();
    }, [currentPatientNIR, navigate]);

    //_____Evenement_____//
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    //_____Affiichage_____//
    return (
        <div className="PatientOverview">
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
            {medFileExists &&
                <PatientSpace nir={currentPatientNIR} setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            }
        </div>
    );
};

export default PatientOverview;