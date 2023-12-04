import React from "react";
// import Navbar from "./Navbar";
import "./Home.css";
import { useState, useEffect } from "react";
const Home = ()=>{
    const [userChat, setUserChat] = useState([]);
    const h = "hello";
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        fetch("http://127.0.0.1:8000/chat/chats/",{
            method : "GET",
            headers:{
                Authorization : `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response)=> response.json())
        .then((data) => setUserChat(data))
        // .then(console.log(userChat))
        .catch((error) => console.error("Error fetching data:",error));
    },[]);
    // console.log(userChat);
    return(
        <>
            <div className="homeinputcontainer"><input className="homeinput" type="text" placeholder="Enter UserName To Search"></input> 
            </div>
            <div className="container">
                <div className="homecontainer">
                    <div className="menucontainer">

                        <div  style={{textAlign:"center", width:"100%",height:"8vh"}}>
                            <h1>Chats</h1>
                        </div>
                        {/* <div className="chatmenu">
                            <div className="chatmenuavatar">
                                <li className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%"}}>account_circle</li>
                            </div>
                            <div className="chatmenupeople">
                                <div className="chatmenupeoplename">
                                    <div className="peoplename">
                                        <p style={{fontSize:"20px", marginTop:"2%"}}>Vivek Kumar</p>
                                    </div>
                                    <div className="lastmsgdate">
                                        <p style={{marginTop: "2%"}}>10:55 pm</p>
                                    </div>
                                </div>
                                <div className="lastmessage">
                                    😂😂
                                </div>
                            </div>
                        </div> */}
                        {userChat.map((chat) => (
                            <div key = {chat.id} className="chatmenu">
                                <div className="chatmenuavatar">
                                <img  style={{fontSize:"8vh", height:"100%", width:"100%"}} src = {`http://127.0.0.1:8000/${chat.chatswith.profilepic}`} />
                                </div>
                                <div className="chatmenupeople">
                                    <div className="chatmenupeoplename">
                                        <div className="peoplename">
                                            <p style={{fontSize:"20px", marginTop:"2%"}}>{chat.chatswith.username}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                        {/* <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>                       
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div>
                        <div className="chatmenu"></div> */}
                        
                    </div>
                    
                    <div className="chatcontainer">

                            <div style={{width:"100%",height:"8vh",backgroundColor:"#F39F5A", display:"flex"}}>
                                <div className="chatmenuavatar" style={{width:"13%"}}>
                                    <li className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%"}}>account_circle</li>
                                </div>
                                <div className="chatmenupeople" style={{"width":"77%"}}>
                                    <div className="chatmenupeoplename">
                                        <div className="peoplename">
                                            <p style={{fontSize:"20px", marginTop:"2%"}}>Vivek Kumar</p>
                                        </div>
                                    </div>
                                    <div className="lastmessage">
                                        online
                                    </div>
                                </div>
                                <div className="lastmsgdate" style={{width:"10%",height:"100%",textAlign:"center"}}>
                                        <li className="material-symbols-outlined" style={{fontSize:"40px",marginTop:"2%"}}>more_vert</li>
                                </div>

                            </div>
                            <div className="chatbox">
                                <p>{h}</p>
                                <div className="recievechat"></div>
                                <div className="sendchat"></div>
                            </div>
                            <div style={{width:"100%",height:"8vh",backgroundColor:"#F39F5A",display:"flex"}}>
                                <li class="material-symbols-outlined" style={{margin:"1%",textAlign:"center",fontSize:"45px",width:"6%"}}>add</li>
                                <input type="text" className="messageinput" placeholder="message"></input>
                                <button className="messagebutton">send</button>
                            </div>

                    </div>
                </div>      
        </div>
        </>
   
    )
}

export default Home;