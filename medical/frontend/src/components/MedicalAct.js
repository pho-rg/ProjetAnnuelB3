import React, {useState} from 'react';
import '../style/MedicalAct.css';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import {AccordionActions, Alert, Button, InputAdornment, TextField, Typography} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SaveIcon from "@mui/icons-material/Save";

const MedicalAct = (props) => {
    //_____Variables_____//
    const [newMedicalActData, setNewMedicalActData] = useState({
        // Remarque : si la l'historique est vide pour le patient, props.data n'est pas alimenté par PatientHistory
        //id:, TODO a gerer cote back
        //service:, TODO a gerer avec la liste deroulante
        //nir:, TODO a gerer avec la localStorage
        date: "",
        intitule_acte: "",
        nom_medecin: "",
        description: ""
    });

    // UseState d'affichage des intitulés
    const [showLabel, setShowLabel] = useState(false);
    // Gestion du message d'erreur
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    //_____Evènements_____//
    // Gestion de l'affichage des intitulés
    const handleLabel = () => {
        setShowLabel(!showLabel);
    };
    // Detection d'un champ modifié sur un type create
    const handleChange = (event) => {
        setAlertOpen(false); // masquage de l'alerte erreur
        setNewMedicalActData({
            ...newMedicalActData,
            [event.target.name]: event.target.value
        });
    };
    // Enregistrement du nouvel acte médical
    const saveNewMedicalAct = () => {
        if (controlChange()) { // contrôles de saisie
            // TODO requete API
            setAlertOpen(false)
            console.log(newMedicalActData);
        } else {
            setAlertMessage("Saisie incorrecte, tous les champs doivent ête complétés.");
            setAlertOpen(true);
        }
    };

    //_____Contrôles_____
    const controlChange = (event) => {
        return (newMedicalActData.date.trim() !== "" &&
            newMedicalActData.intitule_acte.trim() !== "" &&
            newMedicalActData.nom_medecin.trim() !== "" &&
            newMedicalActData.description.trim() !== "");
    };

    //_____Affichage_____//
    return (<div className="MedicalAct">
            {/* Composant repliable*/}
            <Accordion
                sx={{width: '100%', '&:hover': {bgcolor: 'white'}}}
                defaultExpanded={props.type === "create"}
                // Si MedicalAct>create ou MedicalAct>display label affichés alors on dépli
                expanded={props.type === "create" || showLabel}
            >
                {/* Partie visible du composant replié*/}
                <AccordionSummary
                    // Affichage des labels de l'entête si déplié
                    expandIcon={props.type === "display" && <ExpandMoreIcon onClick={handleLabel}/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    onClick={handleLabel}
                    sx={{'&:hover': {bgcolor: 'white'}}}
                >
                    <div className="AccordionSummaryRow">
                        {/* Affichage du titre pour un nouvel acte médical*/}
                        {props.type === "create" && <div className="NewMedicalActLabel">Nouvel acte médical</div>}
                        <div className="MedicalActInfoGlobal">
                            <div className="MedicalActLogo">
                                <DescriptionIcon sx={{color: '#204213', height: "30px", width: "auto"}}/>
                            </div>
                            <div className="MedicalActDate">
                                <div className="MedicalActInfoField">
                                    {/* Si MedicalAct>display déplié ou MedicalAct>create alors on affiche le label*/}
                                    {(showLabel || props.type === "create") && (<Typography
                                        variant="body1"
                                        sx={{mb: 1, color: '#204213'}}>
                                        Date</Typography>)}
                                    <TextField
                                        className="InfoFieldGlobal"
                                        name="date"
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        //type={props.type === "create" && "date"}
                                        InputLabelProps={{shrink: true}}
                                        placeholder="Date du jour"
                                        value={props.type === "display" ? props.data.date : newMedicalActData.date}
                                        variant="standard"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="MedicalActName">
                                <div className="MedicalActInfoField">
                                    {/* Si MedicalAct>display déplié ou MedicalAct>create alors on affiche le label*/}
                                    {(showLabel || props.type === "create") && (<Typography
                                        variant="body1"
                                        sx={{mb: 1, color: '#204213'}}>
                                        Intitulé de l'acte médical</Typography>)}
                                    <TextField
                                        className="InfoFieldGlobal"
                                        name="intitule_acte"
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        placeholder="Intitulé de la consultation"
                                        value={props.type === "display" ? props.data.intitule_acte :
                                            newMedicalActData.intitule_acte}
                                        variant="standard"
                                        sx={{width: '100%'}}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                {/* Partie visible du composant déplié*/}
                <AccordionDetails>
                    <div className="MedicalActInfoBody">
                        <div className="MedicalActInfoBodyRow">
                            <div className="MedicalActDoctor">
                                <div className="MedicalActInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Nom du
                                        médecin</Typography>
                                    <TextField
                                        className="InfoFieldColored"
                                        name="nom_medecin"
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        placeholder="Nom du médecin"
                                        value={props.type === "display" ? props.data.nom_medecin :
                                            newMedicalActData.nom_medecin}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AssignmentIndIcon sx={{color: '#204213'}}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{mb: 2}}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="MedicalActLogo">
                                <DownloadIcon sx={{color: '#204213', height: "30px", width: "auto"}}/>
                            </div>
                        </div>
                        <div className="MedicalActInfoBodyRow">
                            <div className="MedicalActInfoField">
                                <Typography variant="body1"
                                            sx={{mb: 1, color: '#204213'}}>Compte-rendu</Typography>
                                <TextField
                                    className="InfoFieldColored"
                                    name="description"
                                    // Si MedicalAct>display on grise le champ
                                    disabled={props.type === "display"}
                                    multiline
                                    rows={10}
                                    placeholder="Rédiger un compte-rendu détaillé"
                                    value={props.type === "display" ? props.data.description :
                                        newMedicalActData.description}
                                    sx={{width: '100%'}}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
                {/* Si MedicalAct de type création, on affiche les boutons*/}
                {props.type === "create" && <AccordionActions>
                    <div className="MedicalActButtonsContainer">
                        <div className="MedicalActButtons">
                            {alertOpen &&
                                <div className="newMedicalActAlert">
                                    <Alert severity="error"
                                           onClose={handleCloseAlert}
                                           sx={{minWidth: '30%'}}>
                                        {alertMessage}
                                    </Alert>
                                </div>
                            }
                            <div className="MedicalActSaveChange">
                                <Button variant="contained"
                                        endIcon={<SaveIcon/>}
                                        onClick={saveNewMedicalAct}
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </div>
                    </div>
                </AccordionActions>}
            </Accordion>
        </div>
    )
}

export default MedicalAct;