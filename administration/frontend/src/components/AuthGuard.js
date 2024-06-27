// Composat de vérification de la connexion
import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

// Si token invalide redirection vers la page de login
const AuthGuard = ({children}) => {
    if(!accountService.isLogged()) {
        return <Navigate to="/login/"/>
    }
    return children;
}

export default AuthGuard;