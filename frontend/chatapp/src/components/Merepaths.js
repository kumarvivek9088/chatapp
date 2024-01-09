import React from "react";
import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import Home  from "./Home";
import Navbar from "./Navbar";
// import { useAuth } from "../context/authorization";
import { AuthProvider } from '../context/authorization';

const Merepaths = ()=>{
    const isAuthenticated = localStorage.getItem("authToken")!=='undefined' && localStorage.getItem("authToken")!==null;
    // const [authToken,setauthToken] = useAuth();
    // if (isAuthenticated){
    //     setauthToken(localStorage.getItem("authToken"));
    // }
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={isAuthenticated?<Home/>:<Navigate to="/login" replace/>} />
            </Routes>
        </>
        // <AuthProvider>
        //     <Navbar/>
        //     <Routes>
        //         <Route path="/" element={isAuthenticated?<Home/>:<Navigate to="/login" replace/>} />
        //     </Routes>
        // </AuthProvider>
    )
}

export default Merepaths