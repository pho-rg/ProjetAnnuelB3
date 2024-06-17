// Composant de la page de login
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

    // Gestion du message d'alerte
    const [alertMessage, setAlertMessage] = useState("")
    const [alertOpen, setAlertOpen] = useState(false);

    // Objet des infos de connexion (email, mdp)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // Bool d'affichage/masquage du mdp
    const [showPassword, setShowPassword] = useState(false);

    //_____Evènements_____//
    // Mise à jour champs (email, mdp) de l'objet "credentials"
    const handleChange = (event) => {
            setAlertOpen(false);
            setCredentials({
                ...credentials,
                [event.target.name]: event.target.value
            });
    }
    // Click logo oeil pour afficher/masquer le mdp
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();

    };
    // Click bouton pour se connecter
    const handleLogin = (event) => {
        event.preventDefault();
        if (accountService.isEmailValid(credentials.email)) {
            // TODO provisoire
            accountService.saveToken("abc");
            console.log(localStorage.getItem('token'));
            navigate('/search');
            // TODO back
            /*accountService.login(credentials)
                .then(res => {
                    console.log(res);
                    accountService.saveToken(res.data.access_token)
                    //navigate('/search');
                })
                .catch(error => console.log(error))*/
        } else {
            setAlertMessage(" Identifiants incorrects");
            setAlertOpen(true);
        }
    }
    // Gestion des touches
    const handleKeyDown = (event) => {
        // Entrer pour se connecter
        if (event.key === "Enter") {
            handleLogin(event)
        }
        // empecher les espaces
        else if (event.key === " ") {
            event.preventDefault();
        }
    }

    //_____Affichage_____//
    return (<div className="Login">
        <div className="LoginContainer">
            <div className="LoginTitle">
                <LocalHospitalIcon className="navbarIcon" sx={{fontSize: 80, color:"#33691e"}}/>
            </div>
            <div className="LoginTitle">
                <h2>Hôpital Mignon</h2>
            </div>
            <div className="LoginForm">
                <div className="LoginInput">
                    <FormControl variant="outlined">
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
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </FormControl>
                </div>
                <div className="LoginInput">
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{pr:2.2}}
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
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </FormControl>
                </div>
                <div className="LoginButton">
                    <Button variant="contained" onClick={handleLogin}>
                        Se connecter
                    </Button>
                </div>
                {/* Si contrôle ko alors affichage du message d'erreur*/}
                { alertOpen &&
                    <div className="LoginAlert">
                        <Alert severity="error">
                            {alertMessage}
                        </Alert>
                    </div>
                }
            </div>
        </div>
    </div>);
}

export default Login;