import React from 'react';
import {useParams} from "react-router-dom";

const PatientRegister = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientRegister">
            <p>PatientRegister NIR : {currentPatientNIR}</p>
        </div>
    );
};

export default PatientRegister;