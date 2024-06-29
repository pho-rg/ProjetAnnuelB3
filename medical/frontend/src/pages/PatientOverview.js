// Page de toutes les infos médicales du patient
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PatientSpace from "../components/PatientSpace";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';

const PatientOverview = () => {
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();
    const [medFileExists, setMedFileExists] = useState(false);
    const [medFileNotExistsAlert, setMedFileNotExistsAlert] = useState(false);

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
                    setMedFileNotExistsAlert(true);
                    // Si le dossier n'existe pas, on dirige vers la page du patient
                    navigate(`/patient-register/${currentPatientNIR}`);
                    // TODO fix bug
                    window.location.reload();
                } else {
                    setMedFileExists(true);
                    setMedFileNotExistsAlert(false);
                }
            } catch (err) {
                console.log(err)
                setMedFileExists(false);
                setMedFileNotExistsAlert(true);
                setAlertMessage("Erreur à la vérification du dossier administratif.");
                setAlertOpen(true);
            }
        };

        checkMedicalFileExists();
    }, [currentPatientNIR, navigate]);

    const handleCloseAlert = () => {
        setMedFileNotExistsAlert(false);
        setAlertOpen(false);
    }

    return (
        <div className="PatientOverview">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            { (alertOpen || medFileNotExistsAlert) &&
                <div className="noMedFileAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}
                           sx={{minWidth: '30%'}}>
                        {medFileNotExistsAlert ?
                            "Une erreur est survenue lors de la récupération du dossier médical." :
                            alertMessage}
                    </Alert>
                </div>
            }
            {medFileExists && <PatientSpace nir={currentPatientNIR}/>}
        </div>
    );
};

export default PatientOverview;