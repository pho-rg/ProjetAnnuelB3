// Composant d'affichage de l'historique des actes médicaux et possibilité d'en ajouter un
import React, {useState} from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Alert, Button, MenuItem, Select, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MedicalActList from "./MedicalActList";
import EditOffIcon from "@mui/icons-material/EditOff";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const PatientHistory = (props) => {
    //_____Variables_____//
    // UseState de création d'un nouvel acte médical
    const [newMedicalAct, setNewMedicalAct] = useState(false);
    // UseState de tri séléctionné
    const [selectedSort, setSelectedSort] = useState(1);
    // UseState message de succès d'ajout ; echec géré dans MedicalAct
    const [alertText, setAlertText] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    //_____Evènement_____//
    // Gestion de l'ajout d'un nouvel acte médical
    const handleAdd = () => {
        setShowSuccessAlert(false);
        setNewMedicalAct(prevState => !prevState);
    };

    // Gestion de tri de la liste des actes médicaux
    const handleChange = (event) => {
        setSelectedSort(event.target.value);
    };

    // Gestion du succès de l'ajout d'un acte médical
    const handleSuccess = () => {
        setNewMedicalAct(false);
        setAlertText("Nouvel acte médical ajouté avec succès.")
        setShowSuccessAlert(true);
    }

    //_____Affichage_____//
    return (<div className="PatientHistory">
            <div className="patientHistoryTitle">
                <CoPresentIcon sx={{color: '#204213', height: "50px", width: "auto", mr: 2}}/>
                <Typography variant="h4" sx={{color: '#204213'}}>{props.service}</Typography>
            </div>
            <div className="patientHistoryBody">
                <div className="patientHistoryBodyLabel">
                    <Typography variant="h5">Liste des actes médicaux</Typography>
                </div>
                <div className="patientHistoryButton">
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
                <div className="patientHistoryAddedMedicalAct">
                    {/* Si bouton d'ajout cliqué, affichage d'un composant MedicalAct de type create*/}
                    {newMedicalAct && <MedicalAct type="create"
                                                  data={{}}
                                                  handleSuccess={handleSuccess}/>}
                </div>
                {showSuccessAlert &&
                    <div className="medicalActAddedAlertSuccess">
                        <Alert icon={false} severity="success" onClose={() => {setShowSuccessAlert(false)}}
                               sx={{width: '100%', justifyContent: 'center'}}>
                            <div className="medInfoAlertSuccessTitle">
                                <TaskAltIcon fontSize="medium"/>
                                <Typography variant="body1" sx={{pl: 1}}>Succès</Typography>
                            </div>
                            <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                        </Alert>
                    </div>}
                <div className="patientHistorySortContainer">
                    <div className="PatientHistorySortLabel">
                        <ImportExportIcon sx={{fontSize: 30}}/>
                    </div>
                    <Select
                        variant={"standard"}
                        sx={{minWidth: '20%', textAlign:"left", ml:1}}
                        value={selectedSort}
                        onChange={handleChange}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        <MenuItem value={1}>Actes récents</MenuItem>
                        <MenuItem value={2}>Actes anciens</MenuItem>
                        <MenuItem value={3}>Nom du médecin</MenuItem>
                    </Select>
                </div>
                <div className="patientHistoryMedicalActList">
                    {/* Liste des actes médicaux en fonction du patient (nir) et du service*/}
                    <MedicalActList nir={props.nir} service={props.service} selectedSort={selectedSort}/>
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;