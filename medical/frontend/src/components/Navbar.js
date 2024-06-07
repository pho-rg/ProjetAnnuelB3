// Composant de la barre de navigation
import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../style/Navbar.css'

const Navbar = () => {
    //_____Variables_____//
    // TODO -> recup nom hopital avec accountService
    //const fullHospitalName = 'Hôpital ' + accountService.getHospitalName();
    const fullHospitalName = 'Hôpital Mignon';
    // TODO -> recup nom utilisateur avec accountService
    //const fullUserName = 'Dr ' + accountService.getUserName();
    const fullUserName = 'Dr Cohen';

    //_____Affichage_____//
    return (
        <div className="Navbar">
            <div className="NavbarSplit">
                <div className="NavBarHospital">
                    <LocalHospitalIcon className="NavbarIcon" fontSize="large"/>
                    <h3>{fullHospitalName}</h3>
                </div>
            </div>
            <div className="NavbarSplit">
                <div className="NavBarDoctor">
                    <h3>{fullUserName}</h3>
                    <AccountCircleIcon className="NavbarIcon" fontSize="large"/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;