import React from "react";
// import Navbar from "./Navbar";
import "./Home.css";
import { useState, useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authorization";
const baseurl = process.env.REACT_APP_BASE_URL;
const Home = ()=>{
    // const authToken = localStorage.getItem("authToken");
    const userid = localStorage.getItem("userid");
    const [authToken,setauthToken] = useAuth();
    console.log("this is the place where token came",authToken);
    // console.log(userid);
    const [userChat, setUserChat] = useState([]);
    const [searchdata, setsearchdata] = useState([]);
    const [searchuser, setsearchuser] = useState("");
    const [chathistory , setchathistory] = useState([]);
    const [messagetosend, setmessagetosend] = useState("");
    const [roomid,setroomid] = useState("");
    const [ws, setWs] = useState(null);
    const containerRef = useRef(null);
    const [chatrequests , setchatrequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chathistory]);
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
    // const sendbutton = document.getElementById("sendmessage");
    // sendbutton.onclick = ()=>{
    //     console.log("message sent");
    // }
    const onclicksearchuser = (name,profilepic,personid)=>{
        console.log(`searchdata${name} is clicked`);
        fetch(`${baseurl}/chat/chatinfo/${personid}`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if (data.chatexist){
                displaychatcontainer(name,profilepic,personid,data.roomid);
            }
            else if(data.requestexist){
                displaychatcontainer(name,profilepic,personid,data.roomid,data.requestexist,data.data);
            }
            else {
                displaychatcontainer(name,profilepic,personid,data.roomid,data.requestexist);
            }
        }).catch((error)=>console.error("error fetching in chatinfo",error))
    }
    function displaychatcontainer(name,profilepic,personid,roomid,requestexist=false,data=null){
        // console.log(name);
        let container = document.getElementsByClassName("chatcontainer")[0];
        let pname = document.getElementById("p2");
        if (container.style.display === 'block' &&  pname.innerHTML === name){
            container.style.display = 'none';
        }
        else{
            let menucontainerjs = document.getElementById("chatmenucontainer")
            console.log("this is menucontainer width",window.getComputedStyle(menucontainerjs).width);
            let backarrow = document.getElementsByClassName("backarrow")[0];
            // menucontainerjs.style.display = 'none';
            // if (menucontainerjs.style.width === "100%"){
            //     menucontainerjs.style.display='none';
            //     container.style.width="100%";
            // }
            if (menucontainerjs.offsetWidth>=426){
                menucontainerjs.style.display = 'none';
                // container.style.width = "100%";
                backarrow.style.display = 'flex';
            }
            let dp = document.getElementById('i2');
            let avatar = document.getElementById('l2');
            if (profilepic){
                avatar.style.display = 'none';
                dp.src = `${baseurl}${profilepic}`;
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
            if (roomid!=null){
                console.log("im here in roomid not null condition")
                fetch(`${baseurl}/chat/chathistory/${personid}`,{
                    method: "GET",
                    headers:{
                        Authorization : `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((response)=>response.json())
                .then((data)=>{
                     setchathistory(data);
                     console.log(data)
                    })
                .catch((error)=> console.error("error fetching in history",error));
                console.log(chathistory);
                setroomid(roomid);
                document.getElementById("sendmessagecontainer").style.display="flex";
                document.getElementById("sendrequestcontainer").style.display="none";
            }
            else if (roomid==null){
                setroomid("");
                if (requestexist){
                    setchathistory(data);
                    // if (data[0].sender.id == userid){

                    // }
                    // document.getElementById("requestsentmessage").style.display='block';
                    document.getElementById("sendrequestcontainer").style.display="flex";
                    document.getElementById("sendrequestbutton").style.display='none';
                    document.getElementById("sendmessagecontainer").style.display="none";
                    console.log("request message",data);
                    console.log("request message",chathistory);
                }
                else{
                    
                    document.getElementById("sendrequestbutton").style.display='block';
                    // document.getElementById("requestsentmessage").style.display='none';
                    document.getElementById("sendmessagecontainer").style.display="none";
                    document.getElementById("sendrequestcontainer").style.display="flex";
                }
            }
            // else{
            //     setroomid(roomid);
            //     document.getElementById("sendmessagecontainer").style.display="flex";
            //     document.getElementById("sendrequestcontainer").style.display="none";
            // }

            // this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomid}/?token=${authToken}`);
            // this.ws.onopen= ()=>{
            //     this.ws.send(JSON.stringify({"message":messagetosend}));
            //     console.log("connected")
            // }
            // this.ws.onmessage = (event)=>{
            //     const data = JSON.parse(event.data);
            //     console.log(data.message);
            //     console.log(data.user);
            // }
            // sendbutton.onClick=(event)=>{
            //     ws.send(JSON.stringify({"message":messagetosend}));
            //     setmessagetosend("");
            // }
        }
    }
    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN && messagetosend.trim() !== '') {
          ws.send(JSON.stringify({ message: messagetosend }));
          setmessagetosend(''); // Clear the message input after sending
        }
      };
    useEffect(()=>{
        if (roomid!==""){

            const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomid}/?token=${authToken}`);
            socket.onopen= ()=>{
                //     this.ws.send(JSON.stringify({"message":messagetosend}));
                    console.log("connected");
                    setWs(socket);
                }
            socket.onmessage = (event)=>{
                const data = JSON.parse(event.data);
                console.log(data.message);
                console.log("this user is come from websocket",data.user);
                setchathistory(prevchathistory=>[...prevchathistory,{"sender":{"id":data.user},"message":data.message}]);
            }
            socket.onclose = () => {
                console.log('WebSocket disconnected');
              };
            return () => {
                socket.close(); // Close the WebSocket connection when the component unmounts
              };
        }
    },[roomid,authToken])

    useEffect(() => {
        console.log("im in this chat/chats token",authToken);
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
        fetch(`${baseurl}/chat/chatrequests/`,{
            method: "GET",
            headers: {
                Authorization : `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response)=>response.json())
        .then((data)=>setchatrequests(data))
        .catch((error)=>console.error("Error in fetching requests",error));
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
            if (searchuser===""){
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
        // if(ws !=""){
        //     console.log("im become a websocket object");
        // }
        console.log("here is the search input", searchuser);
        console.log("here is the search data", searchdata);
        // console.log("here is the history data", chathistory);
    }, [searchuser, searchdata,authToken]);
    const sendchatrequest = ()=>{
        let username = document.getElementById("p2").innerHTML;
        let message = document.getElementById("requestmessage").value;
        fetch(`${baseurl}/chat/chatrequests/`,{
            method:"POST",
            headers:{
                Authorization : `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                receiver : username,
                message : message,
            })
        }).then((response)=>response.json())
        .then((data)=>{
            if (data.success){
                console.log([data.data]);
                setchathistory([data.data]);
                document.getElementById("cancelrequestbutton").style.display='none';
                document.getElementById("sendrequestbutton2").style.display='none';
                document.getElementById("sendrequestbutton").style.display='none';
                // document.getElementById("requestsentmessage").style.display='block';
                document.getElementById("sendrequestsubcontainer").style.display='none';
            }
        })
        .catch((error)=> console.error("error in sending request",error))
    }
    const switchtochats = ()=>{
        let chats = document.getElementById("chatsrequestssubchats");
        chats.style.backgroundColor='rgb(15 15 38 / 69%)';
        chats.style.color='white';
        let requests = document.getElementById('chatsrequestssubrequests');
        requests.style.backgroundColor = 'transparent';
        requests.style.color = '#481d25';
        document.getElementById("allchats").style.display='block';
        document.getElementById("allrequests").style.display='none';
    }
    const switchtorequests = ()=>{
        let requests = document.getElementById("chatsrequestssubrequests");
        // requests.style.transition="all 5ms";
        requests.style.backgroundColor='rgb(15 15 38 / 69%)';
        requests.style.color='white';
        let chats = document.getElementById('chatsrequestssubchats');
        // chats.style.transition = "all 5ms";
        chats.style.backgroundColor = 'transparent';
        chats.style.color = '#481d25';
        document.getElementById("allchats").style.display='none';
        document.getElementById("allrequests").style.display='block';
    }
    const acceptrequest = (id)=>{
        fetch(`${baseurl}/chat/chatrequests/accept/${id}/`,{
            method: "PUT",
            headers:{
                Authorization : `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        }).then((response)=>response.json())
        .then((data)=>{
            if (data.success){
                setchathistory(data.data);
                // switchtochats();
                console.log(data.data);
                // displaychatcontainer(data.data[0].sender.username,data.data[0].sender.profilepic,data.data[0].sender.id,data.data[0].users);
                setroomid(data.data[0].users);
                document.getElementById("sendmessagecontainer").style.display="flex";
                document.getElementById("sendrequestcontainer").style.display="none";
            }
        })
        .catch((error)=> console.error("error in accepting request",error))
    }
    const backarrow = ()=>{
        let container = document.getElementsByClassName("chatcontainer")[0];
        let menucontainerjs = document.getElementById("chatmenucontainer")
        container.style.display='none';
        menucontainerjs.style.display='block';
        // if (menucontainerjs.offsetWidth<426){
        //     document.getElementsByClassName("backarrow")[0].style.display='none';
        //     container.style.width="60%";
        //     menucontainerjs.style.width = '40%';
        // }
    }
    // console.log(userChat);
    return(
        <>
            <div className="homeinputcontainer" >
                <input className="homeinput" type="text" id="searchuserinput" placeholder="Enter UserName To Search" value={searchuser} onChange={onsearchuser} onBlur={(event)=>{
                    console.log("im out");
                    // document.getElementsByClassName('searchuserresult')[0].style.display = 'none';
                }} onFocus={(event)=>{
                    document.getElementsByClassName('searchuserresult')[0].style.display = 'block';
                    console.log("im in");
                }} onKeyDown={(event)=>{
                    if(event.key=='Escape'){
                        console.log("esc pressed")
                        document.getElementsByClassName('searchuserresult')[0].style.display = 'none';
                    }
                }}>
                </input>
                <div className="searchuserresult" style={{display:"none"}} >
                {searchdata.map((srdata)=>(
                    <div id={`searchdata${srdata.username}`} key={`searchdata${srdata.username}`} className="chatmenu" style={{backgroundColor:'transparent',height:"5vh"}} onClick={()=>onclicksearchuser(srdata.username,srdata.profilepic,srdata.id)} onMouseOver={()=>document.getElementById(`searchdata${srdata.username}`).style.backgroundColor="#AE445A"} onMouseOut={()=>document.getElementById(`searchdata${srdata.username}`).style.backgroundColor='transparent'}> 
                    <div className="chatmenuavatar" style={{width:"10%"}}>
                        {srdata.profilepic?(

                            <img  className="chatmenuavatarimg" src = {`${baseurl}${srdata.profilepic}`} />
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
                    <div className="menucontainer" id="chatmenucontainer">

                        {/* <div  style={{textAlign:"center", width:"100%",height:"8vh",color:"#481d25"}}>
                            <h1 style={{color:"#481d25"}}>CHATS</h1>
                        </div> */}
                        <div className="chatsrequestscategory">
                            <div className="chatsrequestssubchatsclass" id="chatsrequestssubchats" onClick={switchtochats}>
                                <div style={{display:"flex",margin:"auto"}}>
                                    CHATS

                                </div>
                            </div>
                            <div className="chatsrequestssubrequestsclass" id="chatsrequestssubrequests" onClick={switchtorequests}>
                                <div style={{display:"flex",margin:"auto"}}>
                                    REQUESTS
                                </div>
                            </div>
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
                        <div id="allchats">
                            {userChat.map((chat) => (
                                <div key = {chat.id} className="chatmenu">
                                    <div className="chatmenuavatar">
                                        {chat.chatswith.profilepic ?
                                            (<img  className="chatmenuavatarimg" src = {`${baseurl}${chat.chatswith.profilepic}`} />)
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
                        </div>
                        <div id="allrequests" style={{display:"none"}}>
                            {chatrequests.map((requests) => (
                                requests.sender.id==userid?(
                                    
                                <div id={`requests${requests.id}}`} className="chatmenu">
                                    <div className="chatmenuavatar">
                                        {requests.receiver.profilepic ?
                                            (<img  className="chatmenuavatarimg" src = {`${baseurl}${requests.receiver.profilepic}`} />)
                                        :(
                                            <li className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>)
                                        }
                                            
                                    </div>
                                    <div className="chatmenupeople" onClick={() => displaychatcontainer(requests.receiver.username,requests.receiver.profilepic,requests.receiver.id,null,true,[requests])}>
                                        <div  className="chatmenupeoplename" >
                                            <div className="peoplename">
                                                <p style={{fontSize:"20px", marginTop:"2%"}}>{requests.receiver.username}</p>
                                            </div>
                                            <div className="lastmsgdate">
                                                    <p style={{marginTop: "2%"}}>{requests.message?((new Date(requests.sent_at).toLocaleDateString()===new Date().toLocaleDateString())?new Date(requests.sent_at).toLocaleTimeString():new Date(requests.sent_at).toLocaleDateString()):" "}</p>
                                                </div>
                                        </div>
                                        <div className="lastmessage">
                                                {requests.message?
                                                    (requests.message)
                                                    :(
                                                        "No conversation yet"
                                                    )
                                                }
                                        </div>
                                    </div>
                                </div>

                                ):(

                                <div id={`requests${requests.id}}`} className="chatmenu">
                                    <div className="chatmenuavatar">
                                        {requests.sender.profilepic ?
                                            (<img  className="chatmenuavatarimg" src = {`${baseurl}${requests.sender.profilepic}`} />)
                                        :(
                                            <li className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>)
                                        }
                                            
                                    </div>
                                    <div className="chatmenupeople" onClick={() => displaychatcontainer(requests.sender.username,requests.sender.profilepic,requests.sender.id,null,true,[requests])}>
                                        <div  className="chatmenupeoplename" >
                                            <div className="peoplename">
                                                <p style={{fontSize:"20px", marginTop:"2%"}}>{requests.sender.username}</p>
                                            </div>
                                            <div className="lastmsgdate">
                                                    <p style={{marginTop: "2%"}}>{requests.message?((new Date(requests.sent_at).toLocaleDateString()===new Date().toLocaleDateString())?new Date(requests.sent_at).toLocaleTimeString():new Date(requests.sent_at).toLocaleDateString()):" "}</p>
                                                </div>
                                        </div>
                                        <div className="lastmessage">
                                                {requests.message?
                                                    (requests.message)
                                                    :(
                                                        "No conversation yet"
                                                    )
                                                }
                                        </div>
                                    </div>
                                </div>
                                )

                            ))}
                        </div>
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
                    {/* backgroundColor:"#F39F5A" */}
                            <div style={{width:"100%",height:"8vh", display:"flex",backgroundColor: "rgb(15 15 38 / 69%)",color:"white"}}>
                                <div className="chatmenuavatar" style={{width:"13%" ,display:"flex",margin:"auto"}}>
                                    <li className="material-symbols-outlined backarrow" onClick={backarrow}>arrow_back</li>
                                    <img  id = "i2" className="chatmenuavatarimg"  style={{display:"none"}}/>
                                    <li id = "l2" className="material-symbols-outlined" style={{fontSize:"8vh", height:"100%", width:"100%", display: "flex",margin: "auto",justifyContent:"space-around"}}>account_circle</li>
                                </div>
                                <div className="chatmenupeople" style={{"width":"77%"}}>
                                    <div className="chatmenupeoplename">
                                        <div className="peoplename">
                                            <p  id="p2" style={{fontSize:"20px", marginTop:"2%",color:"white"}}>Vivek Kumar</p>
                                        </div>
                                    </div>
                                    <div className="lastmessage" style={{color:"white"}}>
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
                            <div className="chatbox" ref={containerRef}>
                                <div className="chatmessage">
                                    {chathistory.map((history)=>(
                                        history.sender.id==userid?(
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
                            <div style={{width:"100%",height:"8vh",backgroundColor: "rgb(165 169 186)"}}>
                                <div id="sendmessagecontainer" style={{display:"flex",width:"100%",height:"8vh", margin:"auto"}}>
                                    <li class="material-symbols-outlined" style={{margin:"1%",textAlign:"center",fontSize:"45px",width:"6%"}}>add</li>
                                    <input type="text" className="messageinput" placeholder="message" value={messagetosend} onChange={onchangemessagetosend} onKeyDown={(event)=>{
                                        if (event.key==='Enter'){
                                            document.getElementsByClassName("messagebutton")[0].click();

                                        }
                                    }} ></input>
                                    <button id="sendmessage" className="messagebutton" onClick={sendMessage} style={{backgroundColor:"rgb(15 15 38 / 69%)"}} >send</button>
                                </div>
                                <div id="sendrequestcontainer" className="sendrequestclass">
                                    <div className="sendrequestsubclass" id="sendrequestsubcontainer">
                                        <p className="requesttext">hey any message to send them?</p>
                                        <input type="text" id="requestmessage" className="messageinput" placeholder="optional message" style={{width:"100%"}}></input>
                                    </div>

                                    <button  className="sendrequestbutton" id="cancelrequestbutton" style={{display:"none"}} onClick={()=>{
                                        document.getElementById("cancelrequestbutton").style.display='none';
                                        document.getElementById("sendrequestbutton2").style.display='none';
                                        document.getElementById("sendrequestbutton").style.display='block';
                                        document.getElementById("sendrequestsubcontainer").style.display='none';
                                    }}>Cancel Request</button>
                                    <button  className="sendrequestbutton" id="sendrequestbutton2" style={{display:"none"}} onClick={()=>sendchatrequest()}>Send Request</button>
                                    <button  className="sendrequestbutton" onClick={()=>{
                                        document.getElementById("cancelrequestbutton").style.display='block';
                                        document.getElementById("sendrequestbutton2").style.display='block';
                                        document.getElementById("sendrequestbutton").style.display='none';
                                        document.getElementById("sendrequestsubcontainer").style.display='flex';
                                    }} id="sendrequestbutton">Send Request</button>
                                    {chathistory.map((requests)=>(
                                        requests.sender.id==userid?(

                                            <p className="requesttext" id="requestsentmessage" style={{color:"white"}}>Request sent and waiting for receiver to accept</p>
                                        ):(
                                            <>
                                            <button className="sendrequestbutton" onClick={()=>acceptrequest(requests.id)}>Accept</button>
                                            <button className="sendrequestbutton">Reject</button>
                                            </>
                                        )

                                    ))}
                                </div>
                            </div>

                    </div>
                </div>      
        </div>
        </>
   
    )
}

export default Home;