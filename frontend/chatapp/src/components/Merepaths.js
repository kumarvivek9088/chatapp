import React from "react";
import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import Home  from "./Home";
import Navbar from "./Navbar";


const Merepaths = ()=>{
    const isAuthenticated = localStorage.getItem("authToken")!=='undefined' && localStorage.getItem("authToken")!==null;
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path="/" element={isAuthenticated?<Home/>:<Navigate to="/login" replace/>} />
            </Routes>
        </>
    )
}

export default Merepaths