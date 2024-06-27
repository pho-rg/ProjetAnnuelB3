// Composant de la barre de navigation
import React, {useEffect, useState} from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../style/Navbar.css';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import {useNavigate} from "react-router-dom";
import {accountService} from "../_services/account.service";

const Navbar = () => {
    //_____Variables_____//
    const [userHopital, setUserHopital] = useState("");
    const [userName, setUserName] = useState("");
    // Gestion de la fenetre de deconnexion
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    // Const de changement de page
    const navigate = useNavigate();

    //_____Evenement_____//
    useEffect(() => {
        const retrieveUserName = async () => {
            try {
                const res = await accountService.getUserInfo(localStorage.getItem('email'));
                setUserHopital(res.data.nom_hopital);
                setUserName(res.data.prenom.substring(0,1).toUpperCase() + "."
                    + res.data.nom.substring(0,1).toUpperCase() + res.data.nom.substring(1,).toLowerCase());
            } catch (err) {
                console.error(err);
                setUserName("Espace administratif");
                setUserHopital("Hôpital de France");
            }
        };

        retrieveUserName();
    }, []);

    const handleClickOpenDialog = () => {
        setOpenConfirmDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
    };
    const handleConfirmLogout = () => {
        // Retirer le token
        accountService.logout();
        navigate('/login');
    }

    //_____Affichage_____//
    return (
        <div className="Navbar">
            <div className="navbarSplit">
                <div className="navBarHospital">
                    <LocalHospitalIcon className="navbarIcon" fontSize="large"/>
                    <h3>{userHopital}</h3>
                </div>
            </div>
            <div className="navbarSplit">
                <div className="navBarDoctor">
                    <AccountCircleIcon className="navbarIcon" fontSize="large"/>
                    <h3>{userName}</h3>
                </div>
                <div className="navBarLogout">
                    <MeetingRoomIcon
                        className="navbarIcon"
                        sx={{fontSize: 35, cursor: 'pointer', mt:'15%'}}
                        onClick={handleClickOpenDialog}/>
                    <Dialog
                        open={openConfirmDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="logoutDialog">
                            <DialogTitle id="alert-dialog-title" sx={{color: '#6FA2F8'}}>
                                <div className="logoutDialogTitle">
                                    <WarningIcon sx={{mr:1.5}}/>
                                    Déconnexion
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Vous allez être déconnecté.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="error"
                                        onClick={handleCloseDialog}>Annuler</Button>
                                <Button variant="contained" onClick={handleConfirmLogout}
                                        autoFocus sx={{ml:"3% !important"}}>
                                    Confirmer
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Navbar;