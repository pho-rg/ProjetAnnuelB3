import React from 'react';
import {useParams} from "react-router-dom";
import SearchForm from "../components/SearchForm";

const SearchResult = (props) => {
    let {nom, prenom, date} = useParams();
    return (
        <div className="SearchResult">
            <SearchForm/>
            Résultat avec
            <br/>
            <p>{nom} | {prenom} | {date}</p>
        </div>
    );
};

export default SearchResult;