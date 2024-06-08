// Récupération de la liste des actes médicaux et affichage les uns sous les autres
// Données provisoires avant raccordement au backEnd
import {medicalActData} from '../datas/MedicalActData';
import MedicalAct from "./MedicalAct";
import {Alert} from "@mui/material";

const MedicalActList = (props) => {
    // TODO backEnd
    // tri préalable de medicalActData avec le props.selectedSort en parametre

    //_____Affichage_____//
    return (<div className="MedicalActList">
            {/* pour chaque élément, mappage et injection des données dans un acte médical*/}
            {medicalActData.length > 10 ? (medicalActData.map((act) => (
                    <MedicalAct
                        type="display"
                        key={act.id}
                        data={act}
                    />))
            ) : (<Alert severity="info">Aucun acte médical {props.service.toLowerCase()} pour ce patient</Alert>
            )
            }
        </div>
    );
};

export default MedicalActList;
