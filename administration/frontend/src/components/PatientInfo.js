import React, {useState} from 'react';
import '../style/PatientInfo.css';
import {patientInfoService} from "../_services/patientInfo.service";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EditOffIcon from '@mui/icons-material/EditOff';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SaveIcon from '@mui/icons-material/Save';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Person from '@mui/icons-material/Person';
import SourceIcon from '@mui/icons-material/Source';
import ReportIcon from '@mui/icons-material/Report';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import WarningIcon from '@mui/icons-material/Warning';
import {
    Alert, Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {Event} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const PatientInfo = (props) => {
    //_____Variables_____//
    // Redirection
    const navigate = useNavigate();
    // Tableau de genre
    const gender = ["HOMME", "FEMME"];
    // Affichage / masquage des boutons annuler et enregistrer
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    // Texte du message d'alerte
    const [alertText, setAlertText] = useState("");
    // Ajout / retrait de la div de message d'alerte
    const [showErrorAlert, setShowErrorAlert] = useState();
    // Ajout / retrait de la div de message de succès
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    // Ouverture / fermeture de la fenetre de confirmation
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    // Données patient
    const [patientData, setPatientData] = useState({
        // partie administrative
        nir: props.nir,
        nom: "Org",
        prenom: "Ph",
        date: "2004-02-18",
        sexe: "HOMME",
        telephone: "0625121998",
        adresse: "25 rue du Laurier 40300 Mont de Marsan",
        email: "l.aubry@gmail.com",
        mutuelle: "Maif",
        hopital: "Croix Rousse",
        remarques: "Le mec est complètement fou c'est une dinguerie... ratio"
    });

    console.log(patientData);

    //_____Evènement_____//
    // Gestion des changements sur les infos patient
    const handleChange = (event) => {
        setShowErrorAlert(false); // masquage de l'alerte erreur
        setShowSuccessAlert(false); // masquage de l'alerte succès
        setUnsavedChanges(true); // affichage des boutons Annuler/Enregistrer
        setPatientData({
            ...patientData,
            [event.target.name]: event.target.value
        });
    };
    // Gestion de la fenetre de confirmation
    const handleClickOpenDialog = () => {
        if (controlChange()) {
            // Si saisie valide appel de la fenetre de confirmation
            setOpenConfirmDialog(true);
        } else {
            // Masquage boutton enregistrer
            setUnsavedChanges(false);
            // Affichage de la cause de l'echec du contrôle
            setShowErrorAlert(true);
        }
    };
    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
    };
    // Annulation des changement et remise des valeurs initiales
    const handleCancel = () => {
        // appel à l'API pour récupérer les valeurs bdd
        setUnsavedChanges(false);
    };
    // Mise à jour des infos patient
    const handleSave = () => {
        let error = false;
        if (props.type === "create") {
            // appel à l'API pour créer le profil administratif
            if (!error) {
                // TODO back rediriger une fois API ok
                //navigate(`/patient-overview/${props.nir}`); // on passe sur le PatientOverview
                setAlertText(n => "Succès de la création du profil administratif.");
                setShowSuccessAlert(true);
                setJustAdded(true);
            } else {
                setAlertText(n => "Une erreur est survenue lors de la création du profil administratif.");
                setShowErrorAlert(true);
            }
        } else {
            // appel à l'API pour modifier le profil administratif
            if (!error) {
                setAlertText(n => "Les changements ont bien été enregistrés.");
                setShowSuccessAlert(true); // si réussite
            } else {
                setAlertText(n => "Une erreur est survenue lors de la modification du profil médical.");
                setShowErrorAlert(true); // masquage de l'alerte erreur
            }
        }
        handleCloseDialog();
        setUnsavedChanges(false);
    };

    //_____Fonctions_____//
    const controlChange = (event) => {
        // contrôles de saisie en fonction du champs
        if (!patientInfoService.isNomValide(patientData.nom)) {
            setAlertText("Saisie incorrecte, le nom n'est pas valide.");
            return false;
        } else if (!patientInfoService.isPrenomValide(patientData.prenom)) {
            setAlertText("Saisie incorrecte, le prénom n'est pas valide.");
            return false;
        } else if (!patientInfoService.isDateValide(patientData.date)) {
            setAlertText("Saisie incorrecte, la date n'est pas valide.");
            return false;
        } else if (!patientInfoService.isAdresseValide(patientData.adresse)) {
            setAlertText("Saisie incorrecte, l'adresse n'est pas valide.");
            return false;
        } else if (!patientInfoService.isEmailValide(patientData.email)) {
            setAlertText("Saisie incorrecte, l'email n'est pas valide.");
            return false;
        } else if (!patientInfoService.isTelephoneValide(patientData.telephone)) {
            setAlertText("Saisie incorrecte, le téléphone n'est pas valide.");
            return false;
        } else if (!patientInfoService.isRemarqueValide(patientData.remarques)) {
            setAlertText("Saisie incorrecte, les remarques sont trop longues.");
            return false;
        } else {
            return true;
        }
    }

    //_____Element_____//
    // Bouton de la fiche patient en mode résultat recherche, lien vers patient-overview
    const adminInfoButton = () => {
        switch (props.type) {
            case "display":
                return (<></>);
            case "search":
                return (
                    <div className="adminInfoButton">
                        <Typography variant="body2" sx={{color: '#6FA2F8', mb: 1}}>
                            Espace du patient
                        </Typography>
                        <IconButton aria-label="Voir le profil administratif" onClick={() => {
                            navigate(`/patient-overview/${props.nir}`)
                        }}>
                            <ArrowForwardIcon sx={{color: '#6FA2F8', height: "40px", width: "auto", margin: 'auto'}}/>
                        </IconButton>
                    </div>
                );
            default:
                return (<></>);
        }
    }

    //_____Affichage_____//
    return (
        <div className="PatientInfo">
            {/*Disposition de la fiche patient sur la page de recherche*/}
            {(props.type === "search") &&
                <div className="generalInfo">
                    <div className="adminInfoLogo">
                        <ContactEmergencyIcon sx={{color: '#6FA2F8', height: "150px", width: "auto"}}/>
                    </div>
                    <div className="adminInfoNir">
                        <div className="adminInfoField">
                            <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Numéro NIR</Typography>
                            <TextField
                                className="InfoFieldColored"
                                disabled
                                value={props.nir}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ContactPageIcon sx={{color: '#6FA2F8'}}/>
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
                                <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Prénom</Typography>
                                <TextField
                                    className="InfoFieldColored"
                                    disabled
                                    value={patientData.prenom}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Person sx={{color: '#6FA2F8'}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="adminInfoField">
                                <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Nom de famille</Typography>
                                <TextField
                                    className="InfoFieldColored"
                                    disabled
                                    value={patientData.nom}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SupervisorAccountIcon sx={{color: '#6FA2F8'}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className="adminInfoGlobalRow">
                            <div className="adminInfoField">
                                <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Sexe</Typography>
                                <TextField
                                    className="InfoFieldColored"
                                    disabled
                                    value={patientData.sexe.substring(0, 1).toUpperCase() + patientData.sexe.substring(1).toLowerCase()}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {patientData.sexe === "HOMME" ? <MaleIcon sx={{color: '#6FA2F8'}}/> :
                                                    <FemaleIcon sx={{color: '#6FA2F8'}}/>}
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="adminInfoField">
                                <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Date de
                                    naissance</Typography>
                                <TextField
                                    className="InfoFieldColored"
                                    disabled
                                    type="date"
                                    value={patientData.date}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Event sx={{color: '#6FA2F8'}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                    </div>
                    {adminInfoButton()}
                </div>}
            {/*Disposition de la fiche patient sur la page register et overview*/}
            {(props.type === "display" || props.type === "create") &&
                <div className="fullAdminInfoContainer">
                    <div className="fullAdminInfo">
                        <div className="fullAdminInfoTitle">
                            <SourceIcon
                                sx={{color: '#6FA2F8', height: "60px", width: "auto", mr: 2}}/>
                            <Typography variant="h4" sx={{color: '#6FA2F8'}}>Profil administratif</Typography>
                        </div>
                        {/* Bannière d'information type création*/}
                        {props.type === "create" &&
                            <div className="fullAdminInfoAlert">
                                <Alert icon={false} severity="info"
                                       sx={{width: '100%', justifyContent: 'center', mb: 3}}>
                                    <div className="fullAdminInfoAlertTitle">
                                        <PersonAddAlt1Icon fontSize="medium"/>
                                        <Typography variant="body1" sx={{pl: 1}}>Nouveau patient</Typography>
                                    </div>
                                    <Typography variant="body2">
                                        Veuillez renseigner ci-dessous le profil administratif du patient.
                                    </Typography>
                                </Alert>
                            </div>}
                        {/* Champs de saisie profil administratif*/}
                        <div className="fullAdminInfoData">
                            <div className="fullAdminInfoFirstRow">
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Nom</Typography>
                                    <TextField
                                        className="infoField"
                                        name="nom"
                                        value={patientData.nom}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Prénom</Typography>
                                    <TextField
                                        className="infoField"
                                        name="prenom"
                                        value={patientData.prenom}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>NIR</Typography>
                                    <TextField
                                        className="infoField"
                                        name="nir"
                                        value={props.nir}
                                        variant="outlined"
                                        disabled
                                        sx={{width: "100%"}}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <div className="PatientInfoIcon">
                                        <PersonIcon sx={{fontSize: 80, color: "#6FA2F8"}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="fullAdminInfoRow">
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Sexe</Typography>
                                    <Select
                                        className="infoField"
                                        fullWidth
                                        name="sexe"
                                        value={patientData.sexe}
                                        onChange={handleChange}
                                        MenuProps={{
                                            disableScrollLock: true,
                                        }}
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    >
                                        {gender.map((gender, index) => {
                                            return (
                                                <MenuItem key={index}
                                                          value={gender}>{gender}</MenuItem>)
                                        })}
                                    </Select>
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Date de
                                        naissance</Typography>
                                    <TextField
                                        className="infoField"
                                        name="date"
                                        value={patientData.date}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Mutuelle</Typography>
                                    <TextField
                                        className="infoField"
                                        name="mutuelle"
                                        value={patientData.mutuelle}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                            </div>
                            <div className="fullAdminInfoRow">
                                <div className="fullAdminInfoFieldDouble">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Adresse</Typography>
                                    <TextField
                                        className="infoField"
                                        name="adresse"
                                        value={patientData.adresse}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Email</Typography>
                                    <TextField
                                        className="infoField"
                                        name="email"
                                        value={patientData.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                                <div className="fullAdminInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Téléphone</Typography>
                                    <TextField
                                        className="infoField"
                                        name="telephone"
                                        value={patientData.telephone}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                            </div>
                            <div className="fullAdminInfoRow">
                                <div className="fullAdminInfoFieldSolo">
                                    <Typography variant="body1" sx={{mb: 1, color: '#6FA2F8'}}>Remarques</Typography>
                                    <TextField
                                        className="infoField"
                                        name="remarques"
                                        sx={{width: '100%'}}
                                        multiline
                                        rows={6}
                                        value={patientData.remarques}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        disabled={justAdded}
                                    />
                                </div>
                            </div>
                            <div className="fullAdminInfoButtonsContainer">
                                <div className="fullAdminInfoButtons">
                                    {(props.type === "display" && unsavedChanges) &&
                                        <div className="fullAdminResetChange">
                                            <Button variant="contained"
                                                    color="error"
                                                    endIcon={<EditOffIcon/>}
                                                    onClick={handleCancel}
                                            >
                                                Annuler
                                            </Button>
                                        </div>
                                    }
                                    <div className="fullAdminSaveChange">
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
                                                <DialogTitle id="alert-dialog-title" sx={{color: '#6FA2F8'}}>
                                                    <div className="logoutDialogTitle">
                                                        <WarningIcon sx={{mr: 1.5}}/>
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
                                                            autoFocus sx={{ml: "3% !important"}}>
                                                        Continuer
                                                    </Button>
                                                </DialogActions>
                                            </div>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                            {/* Affichage du message de l'echec de l'ajout*/}
                            {showErrorAlert &&
                                <div className="fullAdminInfoAlertError">
                                    <Alert icon={false} severity="error" onClose={() => {
                                        setShowErrorAlert(false)
                                    }}
                                           sx={{width: '100%', justifyContent: 'center'}}>
                                        <div className="fullAdminInfoAlertErrorTitle">
                                            <ReportIcon fontSize="medium"/>
                                            <Typography variant="body1" sx={{pl: 1}}>Erreur</Typography>
                                        </div>
                                        <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                                    </Alert>
                                </div>}
                            {/* Affichage du message de succès de l'ajout*/}
                            {showSuccessAlert &&
                                <div className="fullAdminInfoAlertSuccess">
                                    <Alert
                                        icon={false}
                                        severity="success"
                                        sx={{width: '100%', justifyContent: 'left'}}
                                        onClose={() => {
                                            setShowSuccessAlert(false)
                                        }}
                                    >
                                        <div className="fullAdminInfoAlertSuccessTitle">
                                            <TaskAltIcon fontSize="medium"/>
                                            <Typography variant="body1" sx={{pl: 1}}>Succès</Typography>
                                        </div>
                                        <Typography variant="body2" sx={{mt: 1.5}}>{alertText}</Typography>
                                    </Alert>
                                </div>}
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default PatientInfo;