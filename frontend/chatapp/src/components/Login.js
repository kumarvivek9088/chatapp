import React from 'react';

const Login = ()=>{
    return (
            <div className='signin-container'>
                <form className='signin-form'>
                    <h1>Login</h1>
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    {/* <input type='password' placeholder='Confirm Password' /> */}
                    <a href='#'>Forgot Password?</a>
                    <button type='submit'>Log in</button>
                    <button className='btn-create-account'>Create Account</button>
                </form>
            </div>
    )
}

export default Login;