// Récupération de la liste des actes médicaux et affichage les uns sous les autres
// Données provisoires avant raccordement au backEnd
import {medicalActData} from '../datas/MedicalActData';
import MedicalAct from "./MedicalAct";
import React, {useState} from "react";
import {Alert} from "@mui/material";

const MedicalActList = (props) => {
    //_____Variables_____//
    const [alertMessage, setAlertMessage] = useState("")

    //_____Affichage_____//
    return (<div className="MedicalActList">
            {/* pour chaque élément, mappage et injection des données dans un acte médical*/}
            {medicalActData.length > 0 ? (medicalActData.map((act) => (
                    <MedicalAct
                        type="display"
                        key={act.id}
                        data={act}
                    />))
            ) : (<Alert severity="warning">Aucun acte médical {props.service.toLowerCase()} pour ce patient</Alert>
            )
            }
        </div>
    );
};

export default MedicalActList;
