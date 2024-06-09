import React, {useState} from 'react';
import '../style/PatientSpace.css'
import PatientInfo from "./PatientInfo";
import PatientHistory from "./PatientHistory";
import {MenuItem, Select, Typography} from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const PatientSpace = (props) => {
    const [selectedService, setSelectedService] = useState("");
    const [services, setServices] = useState(["CARDIOLOGIE", "PÉDIATRIE", "RADIOLOGIE", "CHIRURGIE"]);

    const handleChange = (event) => {
        setSelectedService(event.target.value);
    };

    return (
        <div className="PatientSpace">
            <div className="patientInfoContainerOverview">
                <PatientInfo nir={props.nir} type="display"/>
            </div>
            <div className="selectService">
                    <div className="selectServiceIcon">
                        <AccountTreeIcon sx={{fontSize: 32, color: "#204213", mt:0.5}}/>
                    </div>
                    <Typography variant="h6" sx={{color: "#204213", mr:1.5}}>Service : </Typography>
                    <Select
                        variant={"standard"}
                        sx={{minWidth: '30%', mt:0.5,textAlign:"left"}}
                        value={selectedService}
                        onChange={handleChange}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        {services.map((service, index) => {
                            return (
                                <MenuItem key={index}
                                          value={service.substring(0,1).toUpperCase() + service.substring(1).toLowerCase()}>
                                    {service.substring(0,1).toUpperCase() + service.substring(1).toLowerCase()}
                                </MenuItem>)
                        })}
                    </Select>
                </div>
            {selectedService !== "" && <div className="patientHistoryContainerOverview"><PatientHistory nir={props.nir}
                                                                                                        service={selectedService}/>
            </div>}
        </div>
    );
};

export default PatientSpace;