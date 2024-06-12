import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import {searchService} from "../_services/search.service";
import {Alert} from "@mui/material";
import '../style/PatientOverview.css';
import PatientInfo from "../components/PatientInfo";

const PatientOverview = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {currentPatientNIR} = useParams();
    const medFileExists = searchService.medFileExists(currentPatientNIR);
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
            {medFileExists && <div className="PatientInfoContainer"><PatientInfo nir={currentPatientNIR} type="display" /></div>}
        </div>
    );
};

export default PatientOverview;