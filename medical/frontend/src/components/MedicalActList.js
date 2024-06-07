// Récupération de la liste des actes médicaux et affichage les uns sous les autres
// Données provisoires avant raccordement au backEnd
import {medicalActData} from '../datas/MedicalActData';
import MedicalAct from "./MedicalAct";
import React from "react";

const MedicalActList = (props) => {
    return (<div className="MedicalActList">
            {/* pour chaque élément, mappage et injection des données dans un acte médical*/}
            {medicalActData.map((act) =>
                {return(<MedicalAct
                    type={"display"}
                    key={act.id}
                    data={act}
                />)}
            )}
        </div>
    );
};

export default MedicalActList;
