import React, {useState} from 'react';
import '../style/PatientInfo.css'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOffIcon from '@mui/icons-material/EditOff';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SaveIcon from '@mui/icons-material/Save';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Person from '@mui/icons-material/Person';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import Divider from '@mui/material/Divider';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
    Alert, Button,
    Collapse,
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const PatientInfo = (props) => {
    const bloodGroups = ["O+","O-","A+","A-","B+","B-","AB+","AB-"]
    const [patientData, setPatientData] = useState({
        // partie administrative
        nir:props.nir,
        nom:"AUBRY--POUGET",
        prenom:"Luigi",
        date:"2004-02-18",
        sexe:"HOMME",
        // partie medicale
        taille:"178",
        poids:"75",
        grp_sanguin:"A+",
        remarques:"Le mec est complètement fou c'est une dinguerie... ratio",
        pathologies:[],
        operations:[],
        allergies:[]
    });
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Afficher tout"
                    >
                        <ExpandMoreIcon sx={{color: '#204213', height: "40px", width: "auto"}}/>
                    </ExpandMore>
                </div>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider sx={{mb:4}}/>
                <div className="newFileAlert">
                    <Alert icon={false} severity="info" sx={{width: '100%', justifyContent: 'center'}}>
                        <div className="newFileAlertTitle">
                            <PersonAddAlt1Icon fontSize="medium"/>
                            <Typography variant="body1" sx={{pl: 2}}>Nouveau patient</Typography>
                        </div>
                        Veuillez renseigner ci-dessous le profil médical du patient.
                    </Alert>
                </div>
                <div className="medInfo">
                    <div className="medInfoTitle">
                        <LocalHospitalOutlinedIcon sx={{color: '#204213', height: "40px", width: "auto", mr:2}} />
                        <Typography variant="h5" sx={{color: '#204213'}}>Profil médical</Typography>
                    </div>
                    <div className="medInfoData">
                        <div className="medInfoButtonsRow">
                            <div className="medInfoRowFirst">
                                <div className="medInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Taille</Typography>
                                    <TextField
                                        className="infoField"
                                        type="number"
                                        value={patientData.taille}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Typography variant="body1" sx={{color: '#204213'}}>cm</Typography>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                <div className="medInfoField">
                                    <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Poids</Typography>
                                    <TextField
                                        className="infoField"
                                        type="number"
                                        value={patientData.poids}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Typography variant="body1" sx={{color: '#204213'}}>kg</Typography>
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
                                        value={patientData.grp_sanguin}
                                        // onChange={handleChange}
                                    >
                                        {bloodGroups.map((bloodGroup, index) => {
                                            return(<MenuItem key={index} value={bloodGroup}>{bloodGroup}</MenuItem>)
                                        })}
                                    </Select>
                                </div>
                            </div>
                            <div className="medInfoButtonsContainer">
                                <div className="medInfoButtons">
                                    <div className="medResetChange">
                                        <Button variant="contained"
                                                color="error"
                                                endIcon={<EditOffIcon/>}
                                            // onClick={handleAccess}
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                    <div className="medSaveChange">
                                        <Button variant="contained"
                                                endIcon={<SaveIcon/>}
                                            // onClick={handleAccess}
                                        >
                                            Enregistrer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="medInfoRow">
                            <div className="medInfoFieldFull">
                                <Typography variant="body1" sx={{mb: 1, color: '#204213'}}>Remarques</Typography>
                                <TextField
                                    className="infoField"
                                    sx={{width: '100%'}}
                                    multiline
                                    rows={6}
                                    value={patientData.remarques}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="medInfoListRow">
                    <div className="medInfoList">
                        <MedInfoList list={patientData.pathologies} title={"Pathologies"} />
                    </div>
                    <div className="medInfoList">
                        <MedInfoList list={patientData.allergies} title={"Allergies"} />
                    </div>
                    <div className="medInfoList">
                        <MedInfoList list={patientData.operations} title={"Opérations"} />
                    </div>
                </div>
            </Collapse>

        </div>
    );
};

export default PatientInfo;