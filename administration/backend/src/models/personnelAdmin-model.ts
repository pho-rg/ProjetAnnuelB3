import { RowDataPacket } from 'mysql2/promise';
import moment from "moment/moment";

// Interface représentant un document dans MySQL
interface IPersonnelAdmin {
    id?: number;  // Champ optionnel
    nom: string;
    prenom: string;
    date_naissance: string ;
    email: string;
    mots_de_passe: string;
    id_service: number;
    nom_service:string;
    id_hopital: number;
    nom_hopital:string;
}

// Transformer une ligne de résultats MySQL en un objet IPersonnelAdmin
function rowToIPersonnelAdmin(row: RowDataPacket): IPersonnelAdmin {
    return {
        id: row['id'],
        nom: row['nom'],
        prenom: row['prenom'],
        date_naissance: moment(row['date_naissance'], 'DD MM YYYY').format('YYYY-MM-DD'),
        email: row['email'],
        mots_de_passe:"",
        id_service: row['id_service'],
        nom_service: row['nom_service'],
        id_hopital: row['id_hopital'],
        nom_hopital: row['nom_hopital'],
    };
}

export { IPersonnelAdmin, rowToIPersonnelAdmin };
