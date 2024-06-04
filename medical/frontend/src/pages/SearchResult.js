import React from 'react';
import {useParams} from "react-router-dom";

const SearchResult = (props) => {
    let {nom, prenom, date} = useParams();
    return (
        <div className="SearchResult">
            SearchResult page
            <br/>
            <p>{nom} {prenom}  {date}</p>
        </div>
    );
};

export default SearchResult;