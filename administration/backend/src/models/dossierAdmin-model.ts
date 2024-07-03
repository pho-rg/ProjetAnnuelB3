import { RowDataPacket } from 'mysql2/promise';
import moment, { Moment } from 'moment';

/**Interface dossierAdmin */
interface IDossierAdmin {
    num_secu: string;  // Champ optionnel
    nom: string;
    prenom: string;
    sexe: number;
    date_naissance: string;
    telephone:string;
    email:string;
    adresse:string;
    remarques:string;
    nom_mutuelle:string;
    id_mutuelle: number;
    id_hopital: number;
}

/** Transformer une ligne de résultats MySQL en un objet IDossierAdmin*/
function rowToIDossierAdmin(row: RowDataPacket): IDossierAdmin {
    return {
        num_secu: row['num_secu'],
        nom: row['nom'],
        prenom: row['prenom'],
        sexe: row['sexe'],
        date_naissance: moment(row['date_naissance'], 'YYYY MM DD').format('YYYY-MM-DD'),
        telephone:row['telephone'],
        email:row['email'],
        adresse:row['adresse'],
        remarques:row['remarques'],
        nom_mutuelle:row['nom_mutuelle'],
        id_mutuelle: row['id_mutuelle'],
        id_hopital: row['id_hopital']
    };
}
export { IDossierAdmin, rowToIDossierAdmin };
