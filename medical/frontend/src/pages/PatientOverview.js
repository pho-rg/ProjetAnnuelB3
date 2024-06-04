import React from 'react';
import {useParams} from "react-router-dom";

const PatientOverview = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientOverview">
            PatientOverview page
            <br/>
            <p>
                {"NIR : "}{currentPatientNIR}
            </p>
        </div>
    );
};

export default PatientOverview;