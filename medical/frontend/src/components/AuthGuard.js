// Contrôle de la connexion
import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

// Si le token n'est pas valide, redirection vers la page de connexion
const AuthGuard = ({children}) => {
    if(!accountService.isLogged()) {
        return <Navigate to="/login/"/>
    }

    return children;
}

export default AuthGuard;