// Composant de la barre de navigation
import React, {useState} from 'react';
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
    // TODO -> recup nom hopital avec accountService
    // Const fullHospitalName = 'Hôpital ' + accountService.getHospitalName();
    const fullHospitalName = 'Hôpital Mignon';
    // TODO -> recup nom utilisateur avec accountService
    // Const fullUserName = 'Premiere lettre ' + accountService.getUserName();
    const fullUserName = 'P.Durand';
    // Gestion de la fenetre de deconnexion
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    // Const de changement de page
    const navigate = useNavigate();

    //_____Evenement_____//
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
                    <h3>{fullHospitalName}</h3>
                </div>
            </div>
            <div className="navbarSplit">
                <div className="navBarDoctor">
                    <AccountCircleIcon className="navbarIcon" fontSize="large"/>
                    <h3>{fullUserName}</h3>
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