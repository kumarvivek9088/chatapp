import React from "react";


const Register = ()=>{
    return(
        <div className='signin-container'>
            <form className='signin-form'>
                <h1>Login</h1>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <input type='password' placeholder='Confirm Password' />
                {/* <input type='password' placeholder='Confirm Password' /> */}
                <button type='submit'>Sign-Up</button>
                <button className='btn-create-account'>Log-in</button>
            </form>
        </div>
    )
}