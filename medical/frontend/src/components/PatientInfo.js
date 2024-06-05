import React from 'react';
import '../style/PatientInfo.css'

const PatientInfo = (props) => {
    return (
        <div className="PatientInfo">
            <p>PatientInfo TYPE : {props.type} NIR : {props.nir}</p>
        </div>
    );
};

export default PatientInfo;