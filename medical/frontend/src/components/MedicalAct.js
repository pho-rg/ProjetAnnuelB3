import React, {useState} from 'react';
import '../style/MedicalAct.css';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import {AccordionActions, Button, InputAdornment, TextField, Typography} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EditOffIcon from "@mui/icons-material/EditOff";
import SaveIcon from "@mui/icons-material/Save";

const MedicalAct = (props) => {
    //_____Variables_____//
    // UseState d'affichage des intitulés
    const [showLabel, setShowLabel] = useState(false);

    //_____Evènements_____//
    // Gestion de l'affichage des intitulés
    const handleLabel = () => {setShowLabel(!showLabel);}

    //_____Affichage_____//
    return (<div className="MedicalAct">
            {/* Composant repliable*/}
            <Accordion
                sx={{width: '100%', '&:hover': {bgcolor: 'white'}}}
                defaultExpanded={props.type === "create"}
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
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        value={props.data.date}
                                        variant="standard"
                                        placeholder="Date du jour"
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
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        value={props.data.intitule_acte}
                                        variant="standard"
                                        sx={{width: '100%'}}
                                        placeholder="Intitulé de la consultation"
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
                                        className="InfoFieldDisabled"
                                        // Si MedicalAct>display on grise le champ
                                        disabled={props.type === "display"}
                                        value={props.data.nom_medecin}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AssignmentIndIcon sx={{color: '#204213'}}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{mb: 2}}
                                        placeholder="Nom du médecin"
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
                                    className="InfoFieldDisabled"
                                    // Si MedicalAct>display on grise le champ
                                    disabled={props.type === "display"}
                                    multiline
                                    rows={10}
                                    value={props.data.description}
                                    sx={{width: '100%'}}
                                    placeholder="Rédiger un compte-rendu détaillé"
                                />
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
                {/* Si MedicalAct de type création, on affiche les boutons*/}
                {props.type === "create" && <AccordionActions>
                    <div className="MedicalActButtonsContainer">
                        <div className="MedicalActButtons">
                            <div className="MedicalActResetChange">
                                <Button variant="contained"
                                        color="error"
                                        endIcon={<EditOffIcon/>}
                                >
                                    Annuler
                                </Button>
                            </div>
                            <div className="MedicalActSaveChange">
                                <Button variant="contained"
                                        endIcon={<SaveIcon/>}
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