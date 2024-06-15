import React from 'react';
import {Route, Routes} from "react-router-dom";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult";

// Routage
const SearchRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<Search/>}/>
            <Route path="/result/:nom/:prenom/:date?" element={<SearchResult/>}/>
        </Routes>
    );
};

export default SearchRouter;