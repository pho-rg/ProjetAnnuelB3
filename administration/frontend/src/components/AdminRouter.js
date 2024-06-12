import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import PatientOverview from "../pages/PatientOverview";
import PatientRegister from "../pages/PatientRegister";
import SearchRouter from "./SearchRouter";
import '../style/AdminRouteur.css'

const AdminRouter = () => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/*" element={<SearchRouter/>}/>
                <Route path="/search/*" element={<SearchRouter/>}/>
                <Route path="/patient-overview/:currentPatientNIR" element={<PatientOverview/>}/>
                <Route path="/patient-register/:currentPatientNIR" element={<PatientRegister/>}/>
                <Route path="*" element={<SearchRouter/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;