// Composant d'affichage de l'historique des actes médicaux et possibilité d'en ajouter un
import React, {useState} from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Button, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HealingIcon from '@mui/icons-material/Healing';
import MedicalActList from "./MedicalActList";
import EditOffIcon from "@mui/icons-material/EditOff";

const PatientHistory = (props) => {
    //_____Variables_____//
    // UseState de création d'un nouvel acte médical
    const [newMedicalAct, setNewMedicalAct] = useState(false);
    // UseState d'affichage du nouvel acte médical

    //_____Evènement_____//
    // Gestion de l'ajout d'un nouvel acte médical
    const handleAdd = () => {
        setNewMedicalAct(prevState => !prevState);
    };

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
                    {!newMedicalAct ? <Button
                            variant="contained"
                            endIcon={<AddCircleIcon/>}
                            onClick={handleAdd}>
                            Ajouter un acte médical
                        </Button> :
                        <Button
                            variant="contained"
                            color="error"
                            endIcon={<EditOffIcon/>}
                            onClick={handleAdd}>
                            Annuler la saisie
                        </Button>}
                </div>
                <div className="PatientHistoryAddedMedicalAct">
                    {/* Si bouton d'ajout cliqué, affichage d'un composant MedicalAct de type create*/}
                    {newMedicalAct && <MedicalAct type="create" data={{}}/>}
                </div>
                <div className="PatientHistoryMedicalActList">
                    {/* Liste des actes médicaux en fonction du patient (nir) et du service*/}
                    <MedicalActList nir={props.nir} service={props.service}/>
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;