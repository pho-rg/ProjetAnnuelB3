import React, {useState} from 'react';
import '../style/PatientSpace.css'
import PatientInfo from "./PatientInfo";
import PatientHistory from "./PatientHistory";

const PatientSpace = (props) => {
    const [selectedService, setSelectedService] = useState("Cardiologie");

    return (
        <div className="PatientSpace">
            <PatientInfo nir={props.nir} type="display"/>
            <br/>
            <PatientHistory nir={props.nir} service={selectedService}/>
        </div>
    );
};

export default PatientSpace;