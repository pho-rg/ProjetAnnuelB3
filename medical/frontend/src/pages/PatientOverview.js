import React from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PatientSpace from "../components/PatientSpace";

const PatientOverview = () => {
    const {currentPatientNIR} = useParams();
    return (
        <div className="PatientOverview">
            <SearchForm/>
            <PatientSpace nir={currentPatientNIR}/>
        </div>
    );
};

export default PatientOverview;