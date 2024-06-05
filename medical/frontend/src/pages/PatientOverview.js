import React from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PatientSpace from "../components/PatientSpace";

const PatientOverview = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientOverview">
            <SearchForm/>
            <p>PatientOverview NIR : {currentPatientNIR}</p>
            <PatientSpace nir={currentPatientNIR}/>
        </div>
    );
};

export default PatientOverview;