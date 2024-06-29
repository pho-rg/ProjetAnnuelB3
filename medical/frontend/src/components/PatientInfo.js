// Composant du dossier médical
import React, {useEffect, useRef, useState} from 'react';
import '../style/PatientInfo.css'
import {patientInfoService} from "../_services/patientInfo.service";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOffIcon from '@mui/icons-material/EditOff';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SaveIcon from '@mui/icons-material/Save';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Person from '@mui/icons-material/Person';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ReportIcon from '@mui/icons-material/Report';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import WarningIcon from '@mui/icons-material/Warning';
import {
    Alert, Button,
    Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography
} from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {Event} from "@mui/icons-material";
import MedInfoList from "./MedInfoList";
import {useNavigate} from "react-router-dom";

const PatientInfo = (props) => {
    //_____Variables_____//
    // Blocage du doublon useEffect
    const flag = useRef(false);
    const navigate = useNavigate();
    const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
    const [pathologies, setPathologies] = useState([]);
    const [operations, setOperations] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [expanded, setExpanded] = useState(props.type === "create");
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [patientData, setPatientData] = useState({
        // partie administrative
        num_secu: props.nir,
        nom: "",
        prenom: "",
        date_naissance: "",
        sexe: "",
        // partie medicale
        taille: "",
        poids: "",
        grp_sanguin: "",
        remarques: "",
        pathologies: pathologies,
        operations: operations,
        allergies: allergies
    });

    //_____API_____//
    // Remplissage des infos administratives et médicales
    useEffect(() => {
        if (props.type === "display") {
            patientInfoService.getMedicalFile(props.nir)
                .then(res => {
                    setPatientData({
                        num_secu: props.nir,
                        nom: res.data.nom,
                        prenom: res.data.prenom,
                        date_naissance: res.data.date_naissance,
                        sexe: res.data.sexe,
                        taille: res.data.taille,
                        poids: res.data.poids,
                        grp_sanguin: res.data.grp_sanguin,
                        remarques: res.data.remarques,
                        pathologies: setPathologies(res.data.pathologies),
                        operations: setOperations(res.data.operations),
                        allergies: setAllergies(res.data.allergies)
                    })
                })
        } else {
            patientInfoService.getAdminFile(props.nir)
                .then(res => {
                    setPatientData({
                        num_secu: props.nir,
                        nom: res.data.nom,
                        prenom: res.data.prenom,
                        date_naissance: res.data.date_naissance,
                        sexe: res.data.sexe,
                        taille: "",
                        poids: "",
                        grp_sanguin: "",
                        remarques: "",
                        pathologies: setPathologies([]),
                        operations: setOperations([]),
                        allergies: setAllergies([])
                    })
                })
                .catch(err => console.log(err));
        }
    }, [props.nir, props.type]);

    //_____Evènement_____//
    const handleClickOpenDialog = () => {
        setOpenConfirmDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleCancel = () => {
        if (props.type === "create") {
            // Si annulation de la création patient, on revient sur recherche
            navigate("/search/");
        } else {
            setUnsavedChanges(false);
            // Remise des valeurs avant changement
            patientInfoService.getMedicalFile(props.nir)
                .then(res => {
                    setPatientData({
                        num_secu: props.nir,
                        nom: res.data.nom,
                        prenom: res.data.prenom,
                        date_naissance: res.data.date_naissance,
                        sexe: res.data.sexe,
                        taille: res.data.taille,
                        poids: res.data.poids,
                        grp_sanguin: res.data.grp_sanguin,
                        remarques: res.data.remarques,
                        pathologies: setPathologies(res.data.pathologies),
                        operations: setOperations(res.data.operations),
                        allergies: setAllergies(res.data.allergies)
                    });
                })
                .catch(err => console.log(err));
        }
    };
    const handleSave = () => {
        let error = false;
        if (props.type==="create") {
            patientInfoService.postMedicalFile(patientData)
                .then(res => {
                    setAlertText("Succès de la création du profil médical.");
                    setShowSuccessAlert(true);
                    navigate(`/patient-overview/${props.nir}`); // on passe sur le PatientOverview
                })
                .catch(err => {
                    console.log(err);
                    setAlertText("Une erreur est survenue lors de la création du profil médical.");
                    setShowErrorAlert(true);
                });
        } else {
            // TODO les listes non modifiées sont mise à vide à l'update
            //updatePathologies();
            //updateAllergies();
            //updateOperations();
            patientInfoService.patchMedicalFile(patientData)
                .then(res => {
                    setAlertText("Les changements ont bien été enregistrés.");
                    setShowSuccessAlert(true); // si réussite
                })
                .catch(err => {
                    console.log(err);
                    setAlertText("Une erreur est survenue lors de la modification du profil médical.");
                    setShowErrorAlert(true); // masquage de l'alerte erreur
                });
            // appel à l'API pour modifier le profil médical
            if (!error) {
                setAlertText(n=>"Les changements ont bien été enregistrés.");
                setShowSuccessAlert(true); // si réussite
            } else {
                setAlertText(n=>"Une erreur est survenue lors de la modification du profil médical.");
                setShowErrorAlert(true); // masquage de l'alerte erreur
            }
        }
        handleCloseDialog();
        setUnsavedChanges(false);
    };
    const handleChange = (event) => {
        if (controlChange(event)) { // contrôles de saisie
            setShowErrorAlert(false); // masquage de l'alerte erreur
            setShowSuccessAlert(false); // masquage de l'alerte succès
            setUnsavedChanges(true); // affichage des boutons Annuler/Enregistrer
            setPatientData({
                ...patientData,
                [event.target.name] : event.target.value
            });
        }
    };

    const updatePathologies = (newPathologies) => {
        setPathologies(newPathologies);
        setPatientData(prevData => ({
            ...prevData,
            pathologies: newPathologies
        }));
        setUnsavedChanges(true);
    };

    const updateOperations = (newOperations) => {
        setOperations(newOperations);
        setPatientData(prevData => ({
            ...prevData,
            operations: newOperations
        }));
        setUnsavedChanges(true);
    };

    const updateAllergies = (newAllergies) => {
        setAllergies(newAllergies);
        setPatientData(prevData => ({
            ...prevData,
            allergies: newAllergies
        }));
        setUnsavedChanges(true);
    };


    //_____Fonctions_____//
    const controlChange = (event) => {
        // contrôles de saisie en fonction du champs
        switch (event.target.name) {
            case "taille":
                return (!isNaN(event.target.value) && event.target.value > 0 && event.target.value <= 300);
            case "poids":
                return (!isNaN(event.target.value) && event.target.value > 0 && event.target.value <= 1000);
            case "grp_sanguin":
                return (bloodGroups.includes(event.target.value));
            case "remarques":
                return event.target.value.length <= 1500;
            default:
                return false;
        }
    }
    const adminInfoButton = () => {
        switch (props.type) {
            case "display":
                return (
                    <div className="adminInfoButton">
                        <Typography variant="body2" sx={{color: '#204213', mb: 1}}>
                            {expanded ? "Réduire" : "Profil médical"}
                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Afficher tout">
                            <ExpandMoreIcon sx={{color: '#204213', height: "40px", width: "auto", margin: 'auto'}}/>
                        </ExpandMore>
                    </div>
                );
            case "search":
                return (
                    <div className="adminInfoButton">
                        <Typography variant="body2" sx={{color: '#204213', mb: 1}}>
                            Espace du patient
                        </Typography>
                        <IconButton aria-label="Voir le profil médical" onClick={()=>{navigate(`/patient-overview/${props.nir}`)}}>
                            <ArrowForwardIcon sx={{color: '#204213', height: "40px", width: "auto", margin: 'auto'}}/>
                        </IconButton>
                    </div>
                );
            default:
                return(<></>);
        }
    }
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: '0',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    //_____Affichage_____//
    return (
        <div className="PatientInfo">
            <div className="adminInfo">
                <div className="adminInfoLogo">
                    <ContactEmergencyIcon sx={{color: '#204213', height: "150px", width: "auto"}}/>
                </div>
                <div className="adminInfoNir">
                    <div className="adminInfoField">
                        <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Numéro NIR</Typography>
                        <TextField
                            className="InfoFieldColored"
                            disabled
                            value={props.nir}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ContactPageIcon sx={{color: '#204213'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="adminInfoGlobal">

                    <div className="adminInfoGlobalRow">
                        <div className="adminInfoField">
                            <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Prénom</Typography>
                            <TextField
                                className="InfoFieldColored"
                                disabled
                                value={patientData.prenom}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Person sx={{color: '#204213'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="adminInfoField">
                            <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Nom de famille</Typography>
                            <TextField
                                className="InfoFieldColored"
                                disabled
                                value={patientData.nom}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SupervisorAccountIcon sx={{color: '#204213'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="adminInfoGlobalRow">
                        <div className="adminInfoField">
                            <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Sexe</Typography>
                            <TextField
                                className="InfoFieldColored"
                                disabled
                                value={patientData.sexe === 1 ? "HOMME" : "FEMME"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {patientData.sexe === 1 ? <MaleIcon sx={{color: '#204213'}}/> :
                                                <FemaleIcon sx={{color: '#204213'}}/>}
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="adminInfoField">
                            <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Date de naissance</Typography>
                            <TextField
                                className="InfoFieldColored"
                                disabled
                                type="date"
                                value={patientData.date_naissance}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Event sx={{color: '#204213'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                    </div>
                </div>
                {adminInfoButton()}
            </div>
            {/* Affichage du PatientInfo de type résultat de recherche*/}
            {(props.type!=="search") &&
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className="medInfoContainer">
                        <Divider/>
                        {props.type === "create" &&
                            <div className="medInfoAlert">
                                <Alert icon={false} severity="info" sx={{width: '100%', justifyContent: 'center'}}>
                                    <div className="medInfoAlertTitle">
                                        <PersonAddAlt1Icon fontSize="medium"/>
                                        <Typography variant="body1" sx={{pl: 1}}>Nouveau patient</Typography>
                                    </div>
                                    <Typography variant="body2">
                                        Veuillez renseigner ci-dessous le profil médical du patient.
                                    </Typography>
                                </Alert>
                            </div>}
                        <div className="medInfo">
                            <div className="medInfoTitle">
                                <LocalHospitalOutlinedIcon
                                    sx={{color: '#204213', height: "60px", width: "auto", mr: 2}}/>
                                <Typography variant="h4" sx={{color: '#204213'}}>Profil médical</Typography>
                            </div>
                            <div className="medInfoData">
                                <div className="medInfoButtonsRow">
                                    <div className="medInfoRowFirst">
                                        <div className="medInfoField">
                                        <Typography variant="body1"
                                                        sx={{mb: 1, color: '#204213'}}>Taille</Typography>
                                            <TextField
                                                className="infoField"
                                                type="number"
                                                name="taille"
                                                value={patientData.taille}
                                                onChange={handleChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Typography variant="body1"
                                                                        sx={{color: '#204213'}}>cm</Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="medInfoField">
                                            <Typography variant="body1"
                                                        sx={{mb: 1, color: '#204213'}}>Poids</Typography>
                                            <TextField
                                                className="infoField"
                                                type="number"
                                                name="poids"
                                                value={patientData.poids}
                                                onChange={handleChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Typography variant="body1"
                                                                        sx={{color: '#204213'}}>kg</Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="medInfoField">
                                            <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Groupe
                                                sanguin</Typography>
                                            <Select
                                                className="infoField"
                                                fullWidth
                                                name="grp_sanguin"
                                                value={patientData.grp_sanguin}
                                                onChange={handleChange}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                }}
                                            >
                                                {bloodGroups.map((bloodGroup, index) => {
                                                    return (
                                                        <MenuItem key={index}
                                                                  value={bloodGroup}>{bloodGroup}</MenuItem>)
                                                })}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="medInfoButtonsContainer">
                                        <div className="medInfoButtons">
                                            {(props.type === "display" && unsavedChanges) &&
                                                <div className="medResetChange">
                                                    <Button variant="contained"
                                                            color="error"
                                                            endIcon={<EditOffIcon/>}
                                                            onClick={handleCancel}
                                                    >
                                                        Annuler
                                                    </Button>
                                                </div>
                                            }
                                            <div className="medSaveChange">
                                                <Button variant="contained"
                                                        disabled={!unsavedChanges}
                                                        endIcon={<SaveIcon/>}
                                                        onClick={handleClickOpenDialog}
                                                >
                                                    Enregistrer
                                                </Button>
                                                <Dialog
                                                    open={openConfirmDialog}
                                                    onClose={handleCloseDialog}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <div className="logoutDialog">
                                                        <DialogTitle id="alert-dialog-title" sx={{color: '#204213'}}>
                                                            <div className="logoutDialogTitle">
                                                                <WarningIcon sx={{mr:1.5}}/>
                                                                Confirmation
                                                            </div>
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                {props.type === "create" ?
                                                                    "Créer le profil médical de "
                                                                    + patientData.prenom + " " + patientData.nom + " ?" :
                                                                    "Êtes-vous sûr de vouloir modifier le profil médical de "
                                                                    + patientData.prenom + " " + patientData.nom + " ?"}
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button variant="contained" color="error"
                                                                    onClick={handleCloseDialog}>Annuler</Button>
                                                            <Button variant="contained" onClick={handleSave}
                                                                    autoFocus sx={{ml:"3% !important"}}>
                                                                Continuer
                                                            </Button>
                                                        </DialogActions>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="medInfoRow">
                                    <div className="medInfoFieldFull">
                                        <Typography variant="body1"
                                                    sx={{mb: 1, color: '#204213'}}>Remarques&nbsp;&nbsp;(1 500 caractères max.)</Typography>
                                        <TextField
                                            className="infoField"
                                            name="remarques"
                                            sx={{width: '100%'}}
                                            multiline
                                            rows={6}
                                            value={patientData.remarques}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                                {showErrorAlert &&
                                    <div className="medInfoAlertError">
                                        <Alert icon={false} severity="error" onClose={() => {setShowErrorAlert(false)}}
                                               sx={{width: '100%', justifyContent: 'center'}}>
                                            <div className="medInfoAlertErrorTitle">
                                                <ReportIcon fontSize="medium"/>
                                                <Typography variant="body1" sx={{pl: 1}}>Erreur</Typography>
                                            </div>
                                            <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                                        </Alert>
                                    </div>}
                                {showSuccessAlert &&
                                    <div className="medInfoAlertSuccess">
                                        <Alert icon={false} severity="success" onClose={() => {setShowSuccessAlert(false)}}
                                               sx={{width: '100%', justifyContent: 'center'}}>
                                            <div className="medInfoAlertSuccessTitle">
                                                <TaskAltIcon fontSize="medium"/>
                                                <Typography variant="body1" sx={{pl: 1}}>Succès</Typography>
                                            </div>
                                            <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                                        </Alert>
                                    </div>}
                            </div>
                            <div className="medInfoListRow">
                                <div className="medInfoList">
                                    <MedInfoList list={pathologies}
                                                 title={"Pathologies"}
                                                 //setList={setPathologies}
                                                 setList={updatePathologies}
                                                 enableSave={setUnsavedChanges}/>
                                </div>
                                <div className="medInfoList">
                                    <MedInfoList list={allergies}
                                                 title={"Allergies"}
                                                 //setList={setAllergies}
                                                 setList={updateAllergies}
                                                 enableSave={setUnsavedChanges}/>
                                </div>
                                <div className="medInfoList">
                                    <MedInfoList list={operations}
                                                 title={"Opérations"}
                                                 //setList={setOperations}
                                                 setList={updateOperations}
                                                 enableSave={setUnsavedChanges}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>}
        </div>
);
};

export default PatientInfo;