// Données provisoires
import {medicalActData} from '../datas/MedicalActData';
import MedicalAct from "./MedicalAct";
import React from "react";

const MedicalActList = (props) => {
    return (<div className="MedicalActList">
            {medicalActData.map((act) =>
                {return(<MedicalAct
                    key={act.id}
                    data={act}
                />)}
            )}
        </div>
    );
};

export default MedicalActList;
