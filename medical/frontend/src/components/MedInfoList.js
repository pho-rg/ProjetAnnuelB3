import React from 'react';
import '../style/MedInfoList.css';
import {
    Avatar,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import MasksIcon from '@mui/icons-material/Masks';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Divider from "@mui/material/Divider";

const MedInfoList = (props) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    const titleIcon = () => {switch(props.title){
        case "Pathologies":
            return <HeartBrokenIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        case "Allergies":
            return <CoronavirusIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        case "Opérations":
            return <MasksIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        default:
            return ""
    }}

    return (
        <div className="MedInfoList">
            <div className="listTitleRow">
                {titleIcon()}
                <Typography variant="h6" sx={{color: '#204213', ml:1}}>{props.title}</Typography>
            </div>
            <div className="listAddRow">
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Ajouter"
                    fullWidth
                />
                <IconButton aria-label="add" size="large">
                    <AddCircleOutlineIcon fontSize="inherit" sx={{color: '#204213'}}/>
                </IconButton>
            </div>
            {/*<Divider sx={{mb: 1}}/>*/}
            <div className="listBody">
                <List dense={dense}>
                    {generate(
                        <div className="listItem">
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon sx={{color: '#b32525'}}/>
                                    </IconButton>
                                }>
                                <ListItemText
                                    primary={props.title.substring(0,props.title.length-1)}
                                />
                            </ListItem>
                        </div>
                    )}
                </List>
            </div>
        </div>
    );
};

export default MedInfoList;