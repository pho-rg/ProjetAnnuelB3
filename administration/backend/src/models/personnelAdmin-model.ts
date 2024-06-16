import { RowDataPacket } from 'mysql2/promise';

// Interface représentant un document dans MySQL
interface IPersonnelAdmin {
    id?: number;  // Champ optionnel
    nom: string;
    prenom: string;
    date_de_naissance: Date ;
    email: string;
    mots_de_passe: string;
    id_service: number;
    id_hopital: number;
}

// Transformer une ligne de résultats MySQL en un objet IPersonnelAdmin
function rowToIPersonnelAdmin(row: RowDataPacket): IPersonnelAdmin {
    return {
        id: row['id'],
        nom: row['nom'],
        prenom: row['prenom'],
        date_de_naissance: row['date_de_naissance'],
        email: row['email'],
        mots_de_passe: row['mots_de_passe'],
        id_service: row['id_service'],
        id_hopital: row['id_hopital']
    };
}


export { IPersonnelAdmin, rowToIPersonnelAdmin };
