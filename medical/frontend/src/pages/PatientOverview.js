import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PatientSpace from "../components/PatientSpace";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';

const PatientOverview = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();
    const medFileExists = searchService.medicalFileExists(currentPatientNIR);
    const [medFileNotExistsAlert, setMedFileNotExistsAlert] = useState(!medFileExists);
    useEffect(() => {
        if (alertMessage !== "") {
            setMedFileNotExistsAlert(false);
        }
    }, [alertMessage]);

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