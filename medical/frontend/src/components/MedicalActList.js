// Composant de la liste des actes médicaux pour un patient en fonction du service
import {medicalActService} from "../_services/medicalAct.service";
import MedicalAct from "./MedicalAct";
import {Alert} from "@mui/material";
import {useEffect, useState} from "react";
import {patientInfoService} from "../_services/patientInfo.service";
import {searchService} from "../_services/search.service";

const MedicalActList = (props) => {
    //_____Variables_____//
    // Liste des actes médicaux du patient pour un service
    const [medicalActListData, setMedicalActListData] = useState([]);

    //_____API_____//
    // Appel API pour écupération de la liste et des données
    useEffect(() => {
        const fetchMedicalActs = async () => {
            try {
                const res = await medicalActService.getMedicalActList(props.nir, props.service);
                setMedicalActListData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMedicalActs();
    }, [props.nir, props.service]);

    console.log("medicalActList nir " + props.nir);
    console.log("medicalActList service  " + props.service);
    console.log("medicalActList sort " + props.selectedSort);

    //_____Affichage_____//
    return (<div className="MedicalActList">
            {/* pour chaque élément, mappage et injection des données dans un acte médical*/}
            {medicalActListData.length > 0 ? (medicalActListData.map((act) => (
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
