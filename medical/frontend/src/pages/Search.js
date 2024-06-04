import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const [nir, setNir] = useState("");

    const handleChange = (event) => {
        setNir(event.target.value);
    };
    const handleClick = (event) => {
        navigate("/patient-overview/" + nir.trim())
    };

    return (
        <div className="Search">
            <p>Search page</p>
            <TextField
                id="outlined-basic"
                label="Francais"
                variant="outlined"
                value={nir}
                onChange={handleChange}
            />
            <Button variant="contained" onClick={handleClick}>Patient overview</Button>

        </div>
    );
};

export default Search;