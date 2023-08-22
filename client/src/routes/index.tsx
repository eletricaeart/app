

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { Pages } from "./views";
import { Pages } from "../app/index";

export default function AppRoutes() {
    
    return( <>
        <Routes>
            <Route path="/" element={ <Pages.Home /> } />
            <Route path="/about" element={ <Pages.About /> } />
            <Route path="/users-add" element={ <Pages.UsersAdd /> } />
            <Route path="/teste" element={ <Pages.Teste /> } />
        </Routes>
    </> );
}





