import React from "react";
// import Navbar from "./Navbar";
import "./Home.css";
import { useState, useEffect } from "react";
const Home = ()=>{
    const baseurl = process.env.REACT_APP_BASE_URL;
    const authToken = localStorage.getItem("authToken");
    const userid = localStorage.getItem("userid");
    // console.log(userid);
    const [userChat, setUserChat] = useState([]);
    const [searchdata, setsearchdata] = useState([]);
    const [searchuser, setsearchuser] = useState("");
    const [chathistory , setchathistory] = useState([]);
    const [messagetosend, setmessagetosend] = useState("");
    let ws = "";
    let d = false;
    function displaydotsmenu(){
        let container = document.getElementsByClassName("dotscontainermenu");
        if (d){
            d=false;
            container[0].style.display='none';
        }
        else{
            container[0].style.display="block";
            d=true;

        }

    }
    const onchangemessagetosend = (event)=>{
        setmessagetosend(event.target.value);
    }
    const sendbutton = document.getElementById("sendmessage");
    // sendbutton.onclick = ()=>{
    //     console.log("message sent");
    // }
    function displaychatcontainer(name,profilepic,personid,roomid){
        // console.log(name);
        let container = document.getElementsByClassName("chatcontainer")[0];
        let pname = document.getElementById("p2");
        if (container.style.display == 'block' &&  pname.innerHTML == name){
            container.style.display = 'none';
        }
        else{
            let dp = document.getElementById('i2');
            let avatar = document.getElementById('l2');
            if (profilepic){
                avatar.style.display = 'none';
                dp.src = `http://127.0.0.1:8000/${profilepic}`;
                dp.style.display='block';
            }
            else{
                dp.style.display = 'none';
                avatar.style.display = 'flex';
            }
            pname.innerHTML = name;
            container.style.display = 'block';
            setchathistory([]);
            console.log(baseurl,personid);
            fetch(`${baseurl}chat/chathistory/${personid}`,{
                method: "GET",
                headers:{
                    Authorization : `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response)=>response.json())
            .then((data)=> setchathistory(data))
            .catch((error)=> console.error("error fetching in history",error));
            console.log(chathistory);
            this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomid}/?token=${authToken}`);
            this.ws.onopen= ()=>{
                this.ws.send(JSON.stringify({"message":messagetosend}));
                console.log("connected")
            }
            this.ws.onmessage = (event)=>{
                const data = JSON.parse(event.data);
                console.log(data.message);
                console.log(data.user);
            }
            // sendbutton.onClick=(event)=>{
            //     ws.send(JSON.stringify({"message":messagetosend}));
            //     setmessagetosend("");
            // }
        }
    }
    useEffect(() => {
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

    function onsearchuser(event){
        setsearchuser(event.target.value);
        // if(searchuser==""){
        //     setsearchdata([]);
        // }
        // else{

        //     fetch("http://127.0.0.1:8000/user/searchuser/",{
        //         method:"post",
        //         headers:{
        //             Authorization : `Bearer ${authToken}`,
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(
        //             {
        //                 search : searchuser,
        //             }
        //         ),
        //     }).then((response)=> response.json())
        //     .then((data) => setsearchdata(data.result))
        //     .catch((error) => console.error("error",error))
        // }
        // // console.log("here is the search input",searchuser);
        // console.log("here is the search data",searchdata);
        // for (let srdata in searchdata){
        //     let container1 = document.createElement('div');
        //     container1.classList.add('chatmenu');
        //     container1.style.backgroundColor = 'transparent';
        //     container1.style.height = '5vh';
        //     let c2 = document.createElement('div');
        //     c2.classList.add('chatmenuavatar');
        //     c2.style.width = "10%";
        //     let i = document.createElement('img');
        //     i.classList.add('chatmenuavatarimg');
        //     i.src = `http://127.0.0.1:8000/${searchdata[srdata].profilepic}`;
        //     c2.appendChild(i);
        //     let c3 = document.createElement('div');
        //     c3.classList.add('chatmenupeople');
        //     let pr = document.createElement('p');
        //     pr.style.padding = '1.5%';
        //     pr.innerHTML = `${searchdata[srdata].username} ~ ${searchdata[srdata].firstname} ${searchdata[srdata].lastname}`;
        //     c3.appendChild(pr);
        //     container1.appendChild(c2);
        //     container1.appendChild(c3);
        //     const maincontainer = document.getElementsByClassName('searchuserresult')[0];
        //     maincontainer.appendChild(container1);
        // }
    }
    useEffect(() => {
        let srinput = document.getElementById("searchuserinput");
        srinput.onkeyup=()=>{
            if (searchuser==""){
                console.log("im here in if");
                setsearchdata([]);
            }
            else{

                console.log("im here in else");
                fetch("http://127.0.0.1:8000/user/searchuser/",{
                    method:"post",
                    headers:{
                        Authorization : `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            search : searchuser,
                        }
                    ),
                }).then((response)=> response.json())
                .then((data) => setsearchdata(data.result))
                .catch((error) => console.error("error",error))
            }
        }
        if(ws !=""){
            console.log("im become a websocket object");
        }
        console.log("here is the search input", searchuser);
        console.log("here is the search data", searchdata);
        console.log("here is the history data", chathistory);
    }, [searchuser, searchdata,chathistory]);
    // console.log(userChat);
    return(
        <>
            <div className="homeinputcontainer">
                <input className="homeinput" type="text" id="searchuserinput" placeholder="Enter UserName To Search" value={searchuser} onChange={onsearchuser} onBlur={(event)=>{
                    console.log("im out");
                    document.getElementsByClassName('searchuserresult')[0].style.display = 'none';
                }} onFocus={(event)=>{
                    document.getElementsByClassName('searchuserresult')[0].style.display = 'block';
                    console.log("im in");
                }}>
                </input>
                <div className="searchuserresult" style={{display:"none"}} >
                {searchdata.map((srdata)=>(
                    <div className="chatmenu" style={{backgroundColor:'transparent',height:"5vh"}}>
                    <div className="chatmenuavatar" style={{width:"10%"}}>
                        {srdata.profilepic?(

                            <img  className="chatmenuavatarimg" src = {`http://127.0.0.1:8000/${srdata.profilepic}`} />
                        )
                    :(
                        <li className="material-symbols-outlined" style={{fontSize:"5vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>
                    )}
                    </div>
                    <div className="chatmenupeople" style={{textAlign:'left'}}>
                        <p style={{"padding":"1.5%"}}>{srdata.username} ~ {srdata.firstname} {srdata.lastname}</p>
                    </div>
                </div>
                ))}
                    {/* <div className="chatmenu" style={{backgroundColor:'transparent',height:"5vh"}}>
                        <div className="chatmenuavatar" style={{width:"10%"}}>
                            <img  className="chatmenuavatarimg" src = "http://127.0.0.1:8000//media/profile/helena-lopes-PGnqT0rXWLs-unsplash.jpg" />
                        </div>
                        <div className="chatmenupeople" style={{textAlign:'left'}}>
                            <p style={{"padding":"1.5%"}}>RohitSharma9088 ~ Rohit Sharma</p>
                        </div>
                    </div> */}
                    {/* <div className="chatmenu" style={{backgroundColor:'transparent',height:"5vh"}}>
                        <div className="chatmenuavatar" style={{width:"10%"}}>
                            <li className="material-symbols-outlined" style={{fontSize:"5vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>
                        </div>
                        <div className="chatmenupeople" style={{textAlign:'left'}}>
                            <p style={{"padding":"1.5%"}}>ViratKholi526 ~ Virat Kholi</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="container">
                <div className="homecontainer">
                    <div className="menucontainer">

                        <div  style={{textAlign:"center", width:"100%",height:"8vh",color:"#481d25"}}>
                            <h1 style={{color:"#481d25"}}>Chats</h1>
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
                        {console.log(userChat)}
                        {userChat.map((chat) => (
                            <div key = {chat.id} className="chatmenu">
                                <div className="chatmenuavatar">
                                    {chat.chatswith.profilepic ?
                                        (<img  className="chatmenuavatarimg" src = {`http://127.0.0.1:8000/${chat.chatswith.profilepic}`} />)
                                    :(
                                        <li className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>)
                                    }
                                        
                                </div>
                                <div className="chatmenupeople" onClick={() => displaychatcontainer(chat.chatswith.username,chat.chatswith.profilepic,chat.chatswith.id,chat.id)}>
                                    <div  className="chatmenupeoplename" >
                                        <div className="peoplename">
                                            <p style={{fontSize:"20px", marginTop:"2%"}}>{chat.chatswith.username}</p>
                                        </div>
                                        <div className="lastmsgdate">
                                                <p style={{marginTop: "2%"}}>{chat.lastmessage?((new Date(chat.lastmessage.sent_at).toLocaleDateString()===new Date().toLocaleDateString())?new Date(chat.lastmessage.sent_at).toLocaleTimeString():new Date(chat.lastmessage.sent_at).toLocaleDateString()):" "}</p>
                                            </div>
                                    </div>
                                    <div className="lastmessage">
                                            {chat.lastmessage?
                                                (chat.lastmessage.message)
                                                :(
                                                    "No conversation yet"
                                                )
                                            }
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

                            <div style={{width:"100%",height:"8vh",backgroundColor:"#F39F5A", display:"flex",backgroundColor: "#AE445A"}}>
                                <div className="chatmenuavatar" style={{width:"13%"}}>
                                    <img  id = "i2" className="chatmenuavatarimg"  style={{display:"none"}}/>
                                    <li id = "l2" className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>
                                </div>
                                <div className="chatmenupeople" style={{"width":"77%"}}>
                                    <div className="chatmenupeoplename">
                                        <div className="peoplename">
                                            <p  id="p2" style={{fontSize:"20px", marginTop:"2%"}}>Vivek Kumar</p>
                                        </div>
                                    </div>
                                    <div className="lastmessage">
                                        online
                                    </div>
                                </div>
                                <div  className="dotscontainer" onClick={displaydotsmenu}>
                                    <li className="material-symbols-outlined" style={{fontSize:"40px",marginTop:"5px"}}>more_vert</li>
                                    <div className="dotscontainermenu">
                                        <p className="dotscontainermenuitems">Block</p>
                                        <p className="dotscontainermenuitems">Export chat</p>
                                        <p className="dotscontainermenuitems">View Profile</p>
                                        <p className="dotscontainermenuitems">Mute</p>
                                    </div>
                                </div>

                            </div>
                            <div className="chatbox">
                                <div className="chatmessage">
                                    {chathistory.map((history)=>(
                                        history.sender==userid?(
                                            <div className="sendchat">
                                                <p className="sendtext">{history.message}</p>
                                            </div>
                                        ):(
                                            <div className="recievechat">
                                                <p className="recievetext">{history.message}</p>
                                            </div>
                                        )
                                    ))}
                                    {/* <div className="recievechat">
                                            <p className="recievetext">Hii...</p>
                                    </div>
                                    <div className="sendchat">
                                            <p className="sendtext">Hello..</p>
                                    </div> */}
                                </div>
                            </div>
                            <div style={{width:"100%",height:"8vh",display:"flex",backgroundColor: "#AE445A"}}>
                                <li class="material-symbols-outlined" style={{margin:"1%",textAlign:"center",fontSize:"45px",width:"6%"}}>add</li>
                                <input type="text" className="messageinput" placeholder="message" value={messagetosend} onChange={onchangemessagetosend}></input>
                                <button id="sendmessage" className="messagebutton">send</button>
                            </div>

                    </div>
                </div>      
        </div>
        </>
   
    )
}

export default Home;