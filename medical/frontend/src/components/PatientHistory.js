import React, {useState} from 'react';
import MedicalActList from './MedicalActList';
import '../style/PatientHistory.css'
import {Button} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HealingIcon from '@mui/icons-material/Healing';

const PatientHistory = (props) => {
    const [service, setService] = useState('Cardiologie');

    //_____Affichage_____//
    return (<div className="PatientHistory">
                <div className="PatientHistoryTitle">
                    <HealingIcon sx={{color: '#204213', height: "40px", width: "auto", mr: 2}}/>
                    <h1 className="PatientHistoryLabel">{service}</h1>
                </div>
            <div className="PatientHistoryBody">
                <h2 className="PatientHistoryBodyLabel">Liste des actes médicaux</h2>
                <div className="PatientHistoryButton">
                    <Button variant="contained" endIcon={<AddCircleIcon/>}>
                        Ajouter un acte médical
                    </Button>
                </div>
                <div className="PatientHistoryMedicalActList">
                    <MedicalActList
                        nir={props.nir}
                        service={service}
                        // data
                    />
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;