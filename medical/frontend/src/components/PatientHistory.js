// Composant d'affichage de l'historique des actes médicaux et possibilité d'en ajouter un
import React, {useEffect, useState} from 'react';
import MedicalAct from './MedicalAct';
import '../style/PatientHistory.css'
import {Alert, Button, MenuItem, Select, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MedicalActList from "./MedicalActList";
import EditOffIcon from "@mui/icons-material/EditOff";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {medicalActService} from "../_services/medicalAct.service";
import medicalActList from "./MedicalActList";

const PatientHistory = (props) => {
    //_____Variables_____//
    // UseState de création d'un nouvel acte médical
    const [newMedicalAct, setNewMedicalAct] = useState(false);
    // UseStates de tri
    const [selectedSort, setSelectedSort] = useState(1);
    // UseState message de succès d'ajout ; echec géré dans MedicalAct
    const [alertText, setAlertText] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Liste des actes par service
    const [medicalActListData, setMedicalActListData] = useState([]);

    const fetchMedicalActs = async () => {
        try {
            const res = await medicalActService.getMedicalActList(props.nir, props.service);
            setMedicalActListData(handleSort(res.data));
        } catch (err) {
            props.setAlertText("Une erreur est survenue à la récupération de la liste des actes médicaux.");
            props.setShowErrorAlert(true);
        }
    };

    //_____API_____//
    // Appel API pour écupération de la liste et des données
    useEffect(() => {
        fetchMedicalActs();
    }, [props.nir, props.service]);

    // Detection de changement de tri
    useEffect(() => {
        fetchMedicalActs();
    }, [selectedSort]);

    //_____Evènement_____//
    // Gestion de l'ajout d'un nouvel acte médical
    const handleSort = (list) => {
        switch (selectedSort) {
            case 1:
                return list.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
            case 2:
                return list.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
            default:
                return list.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
        }
    }

    const handleAdd = () => {
        setShowErrorAlert(false);
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
        setShowErrorAlert(false);
        setAlertText("Nouvel acte médical ajouté avec succès.")
        setShowSuccessAlert(true);
        fetchMedicalActs();
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
                                                  nir={props.nir}
                                                  service={props.service}
                                                  data={{}} // données vierge pour la creation
                                                  handleSuccess={handleSuccess}/>}
                </div>
                {showErrorAlert &&
                    <div className="medicalActAddedAlertError">
                        <Alert icon={false} severity="error" onClose={() => {setShowErrorAlert(false)}}
                               sx={{width: '100%', justifyContent: 'center'}}>
                            <div className="medInfoAlertErrorTitle">
                                <TaskAltIcon fontSize="medium"/>
                                <Typography variant="body1" sx={{pl: 1}}>Erreur</Typography>
                            </div>
                            <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                        </Alert>
                    </div>}
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
                    </Select>
                </div>
                <div className="patientHistoryMedicalActList">
                    {/* Liste des actes médicaux en fonction du patient (nir) et du service*/}
                    <MedicalActList setAlertText={setAlertText} setShowErrorAlert={setShowErrorAlert}
                                    service={props.service} medicalActListData={medicalActListData}/>
                </div>
            </div>
        </div>

    )
}

export default PatientHistory;