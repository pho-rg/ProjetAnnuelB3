import { RowDataPacket } from 'mysql2/promise';
import {Sexe} from '../utils/customTypes/sexe-type';

// Interface représentant un document dans MySQL
interface IDossierAdmin {
    num_secu: number;  // Champ optionnel
    nom: string;
    prenom: string;
    sexe: number;
    date_de_naissance: Date;
    telephone:string;
    adresse:string;
    id_mutuelle: number;
    id_hopital: number;
}

// Transformer une ligne de résultats MySQL en un objet IDossierAdmin
function rowToIDossierAdmin(row: RowDataPacket): IDossierAdmin {
    return {
        num_secu: row['num_secu'],
        nom: row['nom'],
        prenom: row['prenom'],
        sexe: row['number'],
        date_de_naissance: row['date_de_naissance'],
        telephone:row['telephone'],
        adresse:row['adresse'],
        id_mutuelle: row['id_mutuelle'],
        id_hopital: row['id_hopital']
    };
}


export { IDossierAdmin, rowToIDossierAdmin };
