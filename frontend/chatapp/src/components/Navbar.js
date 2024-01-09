import React from "react";
import  "./Navbar.css";
// import homelogo from "../images/homelogo.png";
// import dmlogo from "../images/dmlogo.png";
// import channellogo from "../images/channellogo.png";
// import profileavatar from '../images/profileavatar.png';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authorization";
const Navbar = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [userData, setuserData] = useState([]);
  const [authToken,setauthToken] = useAuth();
  const navigate = useNavigate();
  setauthToken(localStorage.getItem("authToken"));
  useEffect(() => {
    // const auth = localStorage.getItem("authToken");
    // updateauthToken(localStorage.getItem("authToken"));
    // console.log("in navbar token",authToken);
    // const authToken = localStorage.getItem("authToken");
    if (authToken){
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
    }
  },[]);
  console.log("this is user profile daata",userData);
  const logout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/');
  }
  return (
    <> 
      <ul className="Navbar">
        {userData.profilepic?(
          <img  className="navbaravatarimg profileavatar" src = {`${baseurl}${userData.profilepic}`} />
        ):
          <li className="material-symbols-outlined profileavatar">account_circle</li>
        }
        <li className="material-symbols-outlined navbaricons">home</li>
        <li className="material-symbols-outlined navbaricons">chat_bubble</li>
        <li className="material-symbols-outlined navbaricons">groups</li>
        <li className="material-symbols-outlined navbaricons">settings</li>
        <li className="material-symbols-outlined navbaricons" onClick={logout}>logout</li>
          {/* <li className="material-symbols-outlined navbarmain">home</li>
          <li className="material-symbols-outlined navbarmain">chat_bubble</li>
          <li className="material-symbols-outlined navbarmain">groups</li>
          <li className="material-symbols-outlined navbarsetting">settings</li>
          <div className="logoutbuttoncontainer">
            <div style={{display:"flex",margin:"auto",marginTop:"auto"}}>

              <button className="sendrequestbutton logoutbutton" onClick={logout}>Logout</button>
            </div>

          </div> */}
      </ul>
      <div className="navbarcontainer">
          {userData.profilepic?(
            <div className="navbarprofilepiccontainer" style={{display:"flex",width:"100%"}}>
                <img  className="navbarprofilepic" src = {`${baseurl}${userData.profilepic}`} />
            </div>
          ):
            <li className="material-symbols-outlined navbaravatar">account_circle</li>
          }
        <li className="material-symbols-outlined navbaricons">home</li>
        <li className="material-symbols-outlined navbaricons">chat_bubble</li>
        <li className="material-symbols-outlined navbaricons">groups</li>
        <li className="material-symbols-outlined navbaricons">settings</li>
        <li className="material-symbols-outlined navbaricons" onClick={logout}>logout</li>
      </div>
    </>
  )
}

export default Navbar
