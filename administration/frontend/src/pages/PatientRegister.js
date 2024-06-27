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
    const adminFileExists = searchService.adminFileExists(currentPatientNIR);
    //_____Contrôle_____//
    // Si le dossier admin existe pour ce patient, on redirige vers patient-overview
    useEffect(() => {
        const checkAdminFile = async () => {
            try {
                const exists = await searchService.adminFileExists(currentPatientNIR);
                if (exists) {
                    navigate(`/patient-overview/${currentPatientNIR}`);
                }
            } catch (err) {
                console.error(err);
                setAlertMessage("Erreur à la vérification du dossier administratif.");
                setAlertOpen(true);
            }
        };

        checkAdminFile();
    }, [currentPatientNIR, navigate]);

    //_____Affichage_____
    return (
        <div className="PatientRegister">
            <SearchForm setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage}/>
            <div className="PatientInfoContainer">
                <PatientInfo nir={currentPatientNIR} type="create"/>
            </div>
        </div>
    );
};

export default PatientRegister;