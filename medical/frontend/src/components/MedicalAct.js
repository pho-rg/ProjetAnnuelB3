import React, {useState} from 'react';
import '../style/MedicalAct.css';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import {InputAdornment, TextField, Typography} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DownloadIcon from '@mui/icons-material/Download';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const MedicalAct = (props) => {
    //_____Variables_____//
    const [medicalActData, setMedicalActData] = useState({
        id:props.id,
        service:props.service,
        nir:props.nir,
        date:props.date,
        intitule:props.intitule_acte,
        nomMedecin:props.nom_medecin,
        desc:props.description
    });

    //_____Evènements_____//
    const handleLabel = () => {
        if (showLabel) {
            setShowLabel(false);
        } else {
            setShowLabel(true);
        }

    }

    const [showLabel, setShowLabel] = useState(false);

    //_____Affichage_____//
    return (<div className="MedicalAct">
                <Accordion sx = {{width: '100%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={handleLabel}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        onClick={handleLabel}
                    >
                        <div className="MedicalActInfoGlobal">
                            <div className="MedicalActLogo">
                                <DescriptionIcon sx={{color: '#204213', height: "30px", width: "auto"}}/>
                            </div>
                            <div className="MedicalActDate">
                                <div className="MedicalActInfoField">
                                    {showLabel && <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Date</Typography>}
                                    <TextField
                                        className="infoFieldGlobal"
                                        disabled
                                        value={medicalActData.date}
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="MedicalActName">
                                <div className="MedicalActInfoField">
                                    {showLabel && <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Intitulé de l'acte
                                        médical</Typography>}
                                    <TextField
                                        className="infoFieldGlobal"
                                        disabled
                                        value={medicalActData.intitule}
                                        variant="standard"
                                        sx = {{width: '100%'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="MedicalActInfoBody">
                            <div className="MedicalActInfoBodyRow">
                                <div className="MedicalActDoctor">
                                    <div className="MedicalActInfoField">
                                        <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Nom du
                                            médecin</Typography>
                                        <TextField
                                            className="infoFieldDisabled"
                                            disabled
                                            value={medicalActData.nomMedecin}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AssignmentIndIcon sx={{color: '#204213'}}/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{mb: 2}}
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
                                            className="infoFieldDisabled"
                                            disabled
                                            multiline
                                            rows={10}
                                            value={medicalActData.desc}
                                            sx = {{width: '100%'}}
                                        />
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
        </div>
    )
}

export default MedicalAct;