import React, {useState} from 'react';
import '../style/MedInfoList.css';
import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import MasksIcon from '@mui/icons-material/Masks';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MedInfoList = (props) => {
    //_____Variables_____//
    const [newItem, setNewItem] = useState("");

    //_____Evènement_____//
    const handleChange = (event) => {
        if (event.target.value.length <= 40) {
            setNewItem(event.target.value);
        }
    }
    const handleAdd = () => {
        if (newItem.toString().length <= 40 && newItem.toString().length > 0 && !props.list.includes(newItem.toString())) {
            props.setList([...props.list, newItem.toString()]);
        }
    }

    //_____Fonctions_____//
    const titleIcon = () => {switch(props.title){
        case "Pathologies":
            return <HeartBrokenIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        case "Allergies":
            return <CoronavirusIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        case "Opérations":
            return <MasksIcon fontSize="medium" sx={{color: '#204213', height: "30px", width: "auto"}}/>
        default:
            return ""
    }};
    const removeListItem = (indexToRemove) => {
        props.setList(props.list.filter((value, index)=>{
            return index !== indexToRemove;
        }));
    };

    //_____Affichage_____//
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
                        value={newItem}
                        onChange={handleChange}/>
                <IconButton aria-label="add" size="large" onClick={handleAdd}>
                    <AddCircleOutlineIcon fontSize="inherit" sx={{color: '#204213'}}/>
                </IconButton>
            </div>
            {/*<Divider sx={{mb: 1}}/>*/}
            <div className="listBody">
                <List>
                    {props.list.length > 0 ? (props.list.map((item, index) => (
                            <div className="listItem" key={index}>
                                <ListItem
                                    secondaryAction={
                                        <div onClick={() => {
                                            removeListItem(index)
                                        }}>
                                            <IconButton edge="end">
                                                <DeleteIcon sx={{color: '#b32525'}}/>
                                            </IconButton>
                                        </div>
                                    }>
                                        <ListItemText
                                            primary={item}
                                            className="listAddRowField"
                                        />
                                </ListItem>
                            </div>))
                    ) : (<div className="listNoItem">
                            <ListItem>
                                <ListItemText
                                    primary={"Aucune "+props.title.substring(0,props.title.length-1).toLowerCase()}
                                />
                            </ListItem>
                        </div>
                    )
                    }
                </List>
            </div>
        </div>
    );
};

export default MedInfoList;