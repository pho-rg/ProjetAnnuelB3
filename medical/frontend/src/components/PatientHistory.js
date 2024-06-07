import React from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Button, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HealingIcon from '@mui/icons-material/Healing';
import MedicalActList from "./MedicalActList";

const PatientHistory = (props) => {
    //_____Affichage_____//
    return (<div className="PatientHistory">
                <div className="PatientHistoryTitle">
                    <HealingIcon sx={{color: '#204213', height: "40px", width: "auto", mr: 2}}/>
                    <Typography variant="h4" sx={{color: '#204213'}}>{props.service}</Typography>
                </div>
            <div className="PatientHistoryBody">
                <div className="PatientHistoryBodyLabel">
                    <Typography variant="h5">Liste des actes médicaux</Typography>
                </div>
                <div className="PatientHistoryButton">
                    <Button variant="contained" endIcon={<AddCircleIcon/>}>
                        Ajouter un acte médical
                    </Button>
                </div>
                <div className="PatientHistoryMedicalActList">
                    <MedicalActList nir={props.nir} service={props.service}/>
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;