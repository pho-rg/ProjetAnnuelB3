// Page de création d'un nouveau patient
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert} from "@mui/material";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import '../style/PatientRegister.css';
import PatientInfo from "../components/PatientInfo";

const PatientRegister = (props) => {
    const navigate = useNavigate();
    const {currentPatientNIR} = useParams();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [adminFileExists, setAdminFileExists] = useState(false);
    const [adminFileNotExistsAlert, setAdminFileNotExistsAlert] = useState(false);

    useEffect(() => {
        if (alertMessage !== "") {
            setAdminFileNotExistsAlert(false);
        }
    }, [alertMessage]);

    // Si les dossiers admin et médical existe pour ce patient, on redirige vers patient-overview
    useEffect(() => {
        // Vérification de l'existence du dossier administratif
        const checkBothFilesExists = async () => {
            try {
                // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                const getRes = await searchService.getAdminFileExists(currentPatientNIR);
                console.log("rep du get admin " + getRes.data.exists);
                if (getRes.data.exists) {
                    setAdminFileExists(true);
                    setAdminFileNotExistsAlert(false);
                    // Vérification du dossier médical
                    try {
                        // Status 200 pour trouvé et non trrouvé ; res.data.exists à true ou false
                        const getResMed = await searchService.getMedicalFileExists(currentPatientNIR);
                        console.log("rep du get medical " + getResMed.data.exists);
                        if (getResMed.data.exists) {
                            // Si le dossier médical existe, on dirige vers la page du patient
                            console.log("med exist " + getResMed.data.exists);
                            navigate(`/patient-overview/${currentPatientNIR}`);
                            // TODO fix bug
                            window.location.reload();
                        }
                    } catch (err) {
                        console.log(err);
                        props.setAlertMessage("Erreur à la vérification du dossier médical.");
                        props.setAlertOpen(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setAdminFileExists(false);
                setAdminFileNotExistsAlert(true);
                setAlertMessage("Erreur à la vérification du dossier administratif.");
                setAlertOpen(true);
            }
        };

        checkBothFilesExists();
    }, [currentPatientNIR, navigate]);

    const handleCloseAlert = () => {
        setAdminFileNotExistsAlert(false);
        setAlertOpen(false);
    }

    return (
        <div className="PatientRegister">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            { (alertOpen || adminFileNotExistsAlert) &&
                <div className="noAdminFileAlert">
                    <Alert severity="error"
                           onClose={handleCloseAlert}
                           sx={{minWidth: '30%'}}>
                        {adminFileNotExistsAlert ?
                            "Une erreur est survenue lors de la récupération du dossier administratif." :
                            alertMessage}
                    </Alert>
                </div>
            }
            {adminFileExists && <div className="PatientInfoContainer"><PatientInfo nir={props.nir} type="create"/></div>}
        </div>
    );
};

export default PatientRegister;