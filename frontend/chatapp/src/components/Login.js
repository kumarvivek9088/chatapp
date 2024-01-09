import React , {useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { useAuth } from '../context/authorization';
const baseurl = process.env.REACT_APP_BASE_URL;
const Login = ()=>{
    const [authToken, setauthToken] = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = {
            username : username,
            password : password,
        };
        try{
            const response = await fetch("http://localhost:8000/user/login/",{
                method : "POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok){
                const data = await response.json();
                localStorage.setItem("authToken",data.token);
                setauthToken(data.token);
                toast("Login Successfull");
                navigate('/');

            }else{
                console.log("error during loing");
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        if (password===confirmpassword){
            const signupData = {
                username : username,
                password : password,
                email : email,
            };
            try{
                const response = await fetch(`${baseurl}/user/createuser/`,{
                method : "POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(signupData),
                });
                if (response.ok){
                    const data = await response.json();
                    localStorage.setItem("authToken",data.token);
                    toast("Signup Successfull");
                    navigate('/');

                }else{
                    console.log("error during loing");
                }
            }catch(error){
                console.log(error);
            }
                
        }
        else{
            setPassword("");
            setconfirmPassword("");
        }
    }
    return (
            <div className='signin-container'>
                <ToastContainer/>
                <form className='signin-form' onSubmit={handleLogin} style={{display:'none'}}>
                    <h1>Login</h1>
                    <input className='logininput' type='text' placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value) } onKeyDown={(event)=>{
                        if(event.key=='Enter'){
                            document.getElementById("loginbutton").click();
                        }
                    }} required/>
                    <input className='logininput' type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    {/* <input type='password' placeholder='Confirm Password' /> */}
                    <a href='/'>Forgot Password?</a>
                    <button id="loginbutton" type='submit' className='loginbutton'>Log in</button>
                    <button className='loginbutton btn-create-account' onClick={()=>{
                        document.getElementsByClassName("signin-form")[0].style.display = 'none';
                        document.getElementsByClassName("signin-form")[1].style.display = 'flex';
                    }}>Create Account</button>
                </form>
                <form className='signin-form' onSubmit={handleSignup}>
                    <h1>Login</h1>
                    <input className='logininput' type='text' placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value) } onKeyDown={(event)=>{
                        if(event.key=='Enter'){
                            document.getElementById("signupbutton").click();
                        }
                    }} required/>
                    <input className='logininput' type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    <input className='logininput' type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    <input className='logininput' type='password' placeholder='Confirm password' value={confirmpassword} onChange={(e)=> setconfirmPassword(e.target.value)} required/>
                    {/* <a href='/'>Forgot Password?</a> */}
                    <button id='signupbutton' type='submit' className='loginbutton'>Create Account</button>
                    <button className='loginbutton btn-create-account' onClick={()=>{
                         document.getElementsByClassName("signin-form")[1].style.display = 'none';
                         document.getElementsByClassName("signin-form")[0].style.display = 'flex';
                    }}>Log in</button>
                </form>
            </div>
    )
}

export default Login;