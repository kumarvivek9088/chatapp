import React , {useState} from 'react';
import "./Login.css";
const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
            }else{
                console.log("error during loing");
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
            <div className='signin-container'>
                <form className='signin-form' onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input className='logininput' type='text' placeholder='Email' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <input className='logininput' type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    {/* <input type='password' placeholder='Confirm Password' /> */}
                    <a href='/'>Forgot Password?</a>
                    <button type='submit' className='loginbutton'>Log in</button>
                    <button className='loginbutton btn-create-account'>Create Account</button>
                </form>
            </div>
    )
}

export default Login;