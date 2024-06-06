import React from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Button} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const PatientHistory = (props) => {

    //_____Affichage_____//
    return (<div className="PatientHistory">
            <p>NIR: {props.nir}</p>
            <h1 className="PatientHistoryLabel">Cardiologie</h1>
            <div className="PatientHistoryButton">
                <Button variant="contained"  endIcon={<AddCircleIcon/>}>
                    Ajouter un acte médical
                </Button>
            </div>
            <h2 className="PatientHistoryLabel">Historique des actes médicaux</h2>
            <MedicalAct nir={props.nir}/>
        </div>

    )
}

export default PatientHistory;