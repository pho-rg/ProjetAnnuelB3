import React from 'react';
import '../style/MedInfoList.css';
import {Typography} from "@mui/material";

const MedInfoList = (props) => {
    return (
        <div className="MedInfoList">
            <div className="listTitleRow">
                <Typography variant="h6" sx={{color: '#204213'}}>{props.title}</Typography>
            </div>
            <div className="listAddRow">

            </div>
            <div className="listBody">

            </div>
        </div>
    );
};

export default MedInfoList;