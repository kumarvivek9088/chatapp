import React from 'react';

const Login = ()=>{
    return (
        <>
            <div className='signin-container'>
                <form className='signin-form'>
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input type='password' placeholder='Confirm Password' />
                    <button type='submit'>Sign-Up</button>
                </form>
            </div>
        </>
    )
}

export default Login;