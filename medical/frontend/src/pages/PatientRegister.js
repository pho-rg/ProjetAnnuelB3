import React from 'react';
import {useParams} from "react-router-dom";

const PatientRegister = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientRegister">
            PatientRegister page
            {currentPatientNIR}
        </div>
    );
};

export default PatientRegister;