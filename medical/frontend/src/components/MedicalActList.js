// Composant de la liste des actes médicaux pour un patient en fonction du service
import {medicalActService} from "../_services/medicalAct.service";
import MedicalAct from "./MedicalAct";
import {Alert} from "@mui/material";
import {useEffect, useState} from "react";

const MedicalActList = (props) => {

    //_____Affichage_____//
    return (<div className="MedicalActList">
            {/* pour chaque élément, mappage et injection des données dans un acte médical*/}
            {props.medicalActListData.length > 0 ? (props.medicalActListData.map((act) => (
                    <MedicalAct
                        type="display"
                        key={act._id}
                        data={act}
                    />))
            ) : (<Alert severity="info">Aucun acte médical {props.service.toLowerCase()} pour ce patient</Alert>
            )
            }
        </div>
    );
};

export default MedicalActList;
