import React, {useState} from 'react';
import '../style/PatientInfo.css'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Person from '@mui/icons-material/Person';
import {InputAdornment, TextField, Typography} from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {Event, ExpandMore} from "@mui/icons-material";

const PatientInfo = (props) => {
    const [patientData, setPatientData] = useState({
        // partie administrative
        nir:props.nir,
        nom:"AUBRY--POUGET",
        prenom:"Luigi",
        date:"2004-02-18",
        sexe:"HOMME",
        // partie medicale
        taille:"",
        poids:"",
        grp_sanguin:"",
        remarques:"",
        pathologies:[],
        operations:[],
        allergies:[]
    });

    return (
        <div className="PatientInfo">
            {/*<p>PatientInfo TYPE : {props.type} NIR : {props.nir}</p>*/}
            <div className="adminInfo">
                <div className="adminInfoLogo">
                    <ContactEmergencyIcon sx={{color: '#204213', height: "150px", width: "auto"}}/>
                </div>
                <div className="adminInfoNir">
                    <div className="adminInfoField">
                        <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Numéro NIR</Typography>
                        <TextField
                            className="infoFieldDisabled"
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
                                className="infoFieldDisabled"
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
                                className="infoFieldDisabled"
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
                                className="infoFieldDisabled"
                                disabled
                                value={patientData.sexe.substring(0, 1).toUpperCase() + patientData.sexe.substring(1).toLowerCase()}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {patientData.sexe === "HOMME" ? <MaleIcon sx={{color: '#204213'}}/> :
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
                                className="infoFieldDisabled"
                                disabled
                                type="date"
                                value={patientData.date}
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

                <div className="adminInfoButton">
                    <ExpandMore sx={{color: '#204213', height: "40px", width: "auto"}}
                        // expand={expanded}
                        // onClick={handleExpandClick}
                        // aria-expanded={expanded}
                                aria-label="Afficher tout"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </div>
            </div>
            <div className="newFileAlert"></div>
            <div className="medInfo"></div>
            <div className="medLists"></div>
        </div>
    );
};

export default PatientInfo;