import React from 'react';
import '../style/PatientSpace.css'
import PatientInfo from "./PatientInfo";

const PatientSpace = (props) => {
    return (
        <div className="PatientSpace">
            <p>PatientSpace NIR : {props.nir}</p>
            <PatientInfo nir={props.nir} type="display"/>
        </div>
    );
};

export default PatientSpace;