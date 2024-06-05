import React, {useState} from 'react';
import '../style/Login.css';
import {
    Alert,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from "react-router-dom";
import {accountService} from '../_services/account.service';


const Login = () => {
    //_____Variables_____
    // Hook de navigation
    const navigate = useNavigate();

    // Bool d'affichage du message d'alerte identifiants incorrects
    const [invalidId, setInvalidId] = useState(false);

    // Component message d'alerte identifiants incorrects
    const errorAlert = invalidId ?
        <Alert className="loginAlert" severity="error">Identifiants incorrects</Alert> : null;

    // Objet des infos de connexion (email, mdp)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // Bool d'affichage/masquage du mdp
    const [showPassword, setShowPassword] = useState(false);

    //_____Evènements_____//
    // Mise à jour champs (email, mdp) de l'objet "credentials"
    const userFormInput = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    // Click logo oeil pour afficher/masquer le mdp
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();

    };
    // Click bouton pour se connecter
    const userFormSubmit = (e) => {
        e.preventDefault();
        if (accountService.login(credentials)) {
            navigate('/search');
        } else {
            setInvalidId(true);
        }
    }
    // Appuie Entrer pour se connecter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (accountService.login(credentials)) {
                navigate('/search');
            } else {
                setInvalidId(true);
            }
        }
    }

    //_____Contrôles_____//
    // TODO

    //_____Affichage_____//
    return (<div className="Login">
        <div className="loginContainer">
            <div className="loginTitle">
                <LocalHospitalIcon className="NavbarIcon" sx={{fontSize: 80}}/>
            </div>
            <div className="loginTitle">
                <h2>Hôpital Mignon</h2>
            </div>
            <div className="loginForm">
                <div className="loginInput">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Adresse Email</InputLabel>
                        <OutlinedInput
                            type='mail'
                            endAdornment={
                                <InputAdornment position="end" sx={{color: 'text.secondary'}}>
                                    <MailIcon/>
                                </InputAdornment>
                            }
                            label="Adresse Email"
                            name="email"
                            value={credentials.email}
                            onChange={userFormInput}
                            onKeyDown={handleKeyDown}
                        />
                    </FormControl>
                </div>
                <div className="loginInput">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{color: 'text.secondary'}}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mot de passe"
                            name="password"
                            value={credentials.password}
                            onChange={userFormInput}
                            onKeyDown={handleKeyDown}
                        />
                    </FormControl>
                </div>
                <div className="loginButton">
                    <Button variant="contained" onClick={userFormSubmit}>
                        Se connecter
                    </Button>
                </div>
                <div>{errorAlert}</div>
            </div>
        </div>
    </div>);
}

export default Login;