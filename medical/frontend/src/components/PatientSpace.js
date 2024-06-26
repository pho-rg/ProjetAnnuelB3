// Espace des infos patient et historique des actes médicaux
import React, {useEffect, useState} from 'react';
import {patientSpaceService} from "../_services/patientSpace.service";
import '../style/PatientSpace.css'
import PatientInfo from "./PatientInfo";
import PatientHistory from "./PatientHistory";
import {MenuItem, Select, Typography} from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const PatientSpace = (props) => {
    //_____Variables_____//
    const [selectedService, setSelectedService] = useState("");
    // Tableau de mutuelle
    const [serviceList, setServiceList] = useState([]);

    //_____API_____//
    // Appel API pour la liste des mutuelles
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await patientSpaceService.getAllService();
                setServiceList(response.data);
            } catch (err) {
                props.setAlertMessage("Une ereur est survenue à la récupération de la liste des services");
                props.setAlertOpen(true);
            }
        };

        fetchServices();
    }, []);

    //_____Evenement_____//
    const handleChange = (event) => {
        setSelectedService(event.target.value);
    };

    //_____Affichage_____//
    return (
        <div className="PatientSpace">
            <div className="patientInfoContainerOverview">
                <PatientInfo nir={props.nir} type="display" setAlertOpen={props.setAlertOpen} setAlertMessage={props.setAlertMessage}/>
            </div>
            <div className="selectService">
                    <div className="selectServiceIcon">
                        <AccountTreeIcon sx={{fontSize: 32, color: "#204213", mt:0.5}}/>
                    </div>
                    <Typography variant="h6" sx={{color: "#204213", mr:1.5}}>Service : </Typography>
                    <Select
                        variant={"standard"}
                        sx={{minWidth: '30%', mt:0.5,textAlign:"left"}}
                        value={selectedService || ''}
                        onChange={handleChange}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        {serviceList.map((service) => {
                            return (
                                <MenuItem key={service._id}
                                          value={service.nom}>
                                    {service.nom.substring(0,1).toUpperCase() + service.nom.substring(1).toLowerCase()}
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