import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import Loadding from '../../Loadding/Loadding';


function Login() {
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const clientId = "794666694539-5bihmfbimrgkfosin3hdsrprmgv6c0f7.apps.googleusercontent.com";

    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'
        } catch (error) {
            console.log(error);
            alert(error.response.data.msg)
        }
    }
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
         console.log('Login Success:', res.profileObj);
          setShowloginButton(false);
          setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
         setShowloginButton(true);
         setShowlogoutButton(false);
    };
 
    return (
        <div className='login-page'>
            <form onSubmit={loginSubmit}>
                <h2 style={{ "textAlign": "center" }}>Login</h2>
                <label name="email" htmlFor="email">Email:</label>
                <input id="email" type='email' name='email' required placeholder='Enter Your Email...' value={user.email} onChange={onChangeInput} />
                <label name="password" htmlFor="password">Password:</label>
                <input id="password" type='password' name='password' required placeholder='Enter Your Password...' value={user.password} onChange={onChangeInput} />
        {/* <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div> */}
                <div className='row-auth'>
                    <button type='submit'>Login</button>
                    <Link to='/register'><button className="register">Register</button></Link>
                    <Link to='/forgot_password'>Forgot Password</Link>         
                </div>
            </form>
        </div >
        
    );
}

export default Login;