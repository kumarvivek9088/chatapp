import React from "react";
import  "./Navbar.css";
// import homelogo from "../images/homelogo.png";
// import dmlogo from "../images/dmlogo.png";
// import channellogo from "../images/channellogo.png";
// import profileavatar from '../images/profileavatar.png';

const Navbar = () => {
  return (
    
    <ul className="Navbar">
        <li className="material-symbols-outlined profileavatar">account_circle</li>
        <li className="material-symbols-outlined navbarmain">home</li>
        <li className="material-symbols-outlined navbarmain">chat_bubble</li>
        <li className="material-symbols-outlined navbarmain">groups</li>
        <li className="material-symbols-outlined navbarsetting">settings</li>
    </ul>
  )
}

export default Navbar
