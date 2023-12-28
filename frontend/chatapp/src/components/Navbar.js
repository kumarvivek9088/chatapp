import React from "react";
import  "./Navbar.css";
// import homelogo from "../images/homelogo.png";
// import dmlogo from "../images/dmlogo.png";
// import channellogo from "../images/channellogo.png";
// import profileavatar from '../images/profileavatar.png';
import { useState,useEffect } from "react";
const Navbar = () => {
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);
    fetch("http://127.0.0.1:8000/user/editprofile/",{
        method : "GET",
        headers:{
            Authorization : `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
    })
    .then((response)=> response.json())
    .then((data) => {
      setuserData(data);
      localStorage.setItem("userid",data.id);
    })
    // .then(console.log(userChat))
    .catch((error) => console.error("Error fetching data:",error));
  },[]);
  console.log(userData);
  return (
    
    <ul className="Navbar">
      {userData.profilepic?(
        <img  className="navbaravatarimg profileavatar" src = {`http://127.0.0.1:8000/${userData.profilepic}`} />
      ):
        <li className="material-symbols-outlined profileavatar">account_circle</li>
      }
        <li className="material-symbols-outlined navbarmain">home</li>
        <li className="material-symbols-outlined navbarmain">chat_bubble</li>
        <li className="material-symbols-outlined navbarmain">groups</li>
        <li className="material-symbols-outlined navbarsetting">settings</li>
    </ul>
  )
}

export default Navbar
