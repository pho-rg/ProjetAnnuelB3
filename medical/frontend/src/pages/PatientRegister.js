import React from 'react';
import {useParams} from "react-router-dom";

const PatientRegister = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientRegister">
            PatientRegister page
            <br/>
            <p>
                {"NIR : "}{currentPatientNIR}
            </p>
        </div>
    );
};

export default PatientRegister;