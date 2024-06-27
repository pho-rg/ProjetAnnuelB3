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
    const adminFileExists = searchService.adminFileExists(currentPatientNIR);
    const [adminFileNotExistsAlert, setAdminFileNotExistsAlert] = useState(!adminFileExists);
    useEffect(() => {
        if (alertMessage !== "") {
            setAdminFileNotExistsAlert(false);
        }
    }, [alertMessage]);
    useEffect(() => {
        if (searchService.medicalFileExists(currentPatientNIR)){
            navigate(`/patient-overview/${currentPatientNIR}`);
        }
    });

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