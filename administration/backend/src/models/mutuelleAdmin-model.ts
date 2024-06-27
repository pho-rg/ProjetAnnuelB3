import { RowDataPacket } from 'mysql2/promise';

/** Interface mutuelle */
interface IMutuelle {
    id_mutuelle : number;
    nom_mutuelle: string;
    telephone : string;
}

/** Transformer une ligne de résultats MySQL en un objet IMutuelle*/
function rowToIMutuelle(row: RowDataPacket): IMutuelle {
    return {
        id_mutuelle : row['id_mutuelle'],
        nom_mutuelle: row['nom_mutuelle'],
        telephone : row['telephone'],
    };
}
export { IMutuelle, rowToIMutuelle };