import React from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Button, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HealingIcon from '@mui/icons-material/Healing';

const PatientHistory = (props) => {

    //_____Affichage_____//
    return (<div className="PatientHistory">
                <div className="PatientHistoryTitle">
                    <HealingIcon sx={{color: '#204213', height: "60px", width: "auto", mr: 2}}/>
                    <Typography variant="h4" className="PatientHistoryLabel">Cardiologie</Typography>
                </div>
            <div className="PatientHistoryBody">
                <h2 className="PatientHistoryBodyLabel">Liste des actes médicaux</h2>
                <div className="PatientHistoryButton">
                    <Button variant="contained" endIcon={<AddCircleIcon/>}>
                        Ajouter un acte médical
                    </Button>
                </div>
                <div className="PatientHistoryMedicalActList">
                    <MedicalAct
                        id={'1a'}
                        service={'Radiologie'}
                        nir={'104021730625478'}
                        date={'08/06/2024'}
                        intitule_acte={'Radio des poumonsRadio des poumonsRadio des poumons'}
                        nom_medecin={'Dr Maboul'}
                        description={'Ah batard tu fumes'}
                    />
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;