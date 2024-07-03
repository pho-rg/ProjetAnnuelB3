// Contrôle de la connexion
import {Navigate, useLocation} from "react-router-dom";
import { searchService } from "../_services/search.service";
import {useEffect, useState} from "react";


// Si le token n'est pas valide, redirection vers la page de connexion
const AuthGuard = ({children}) => {
    const location = useLocation();
    const [hasPermission, setHasPermission] = useState();

    useEffect(() => {
        searchService.getMedicalFileExists("1234")
            .then(() => {
                setHasPermission(true);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        setHasPermission(false);
                    } else {
                        setHasPermission(true);
                    }
                } else {
                    setHasPermission(false);
                }
            })
    }, []);

    if (hasPermission === undefined) {
        return null; // or loading indicator, spinner, etc
    }

    return hasPermission
        ? children
        : <Navigate to="/login" replace state={{ from: location }} />;
}

export default AuthGuard;