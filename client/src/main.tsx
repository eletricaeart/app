

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/globals/global.css";
import { Comps } from "./app/components";
import AppRoutes from "./routes";


export default function App() {

   return( <>
      <Comps.Appbar />
      <Comps.Sidebar />
      <main>
         <AppRoutes />
         app
      </main>
   </> );
}


ReactDOM.createRoot( document.querySelector( "body" ) ).render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.StrictMode>,
);

