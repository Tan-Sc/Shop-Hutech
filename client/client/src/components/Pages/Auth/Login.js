import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { useGoogleLogin } from 'react-google-login'
// import Loadding from '../../Loadding/Loadding';
<GoogleLogin
  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
  onSuccess={responseGoogle}
  isSignedIn={true}
/>

function Login() {
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

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
    const responseGoogle = (response) => {
        console.log(response);
      }
      const { signIn, loaded } = useGoogleLogin({
        onSuccess,
        onAutoLoadFinished,
        clientId,
        cookiePolicy,
        loginHint,
        hostedDomain,
        autoLoad,
        isSignedIn,
        fetchBasicProfile,
        redirectUri,
        discoveryDocs,
        onFailure,
        uxMode,
        scope,
        accessType,
        responseType,
        jsSrc,
        onRequest,
        prompt
      })
      
    ReactDOM.render(
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with google</button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />,
        document.getElementById('googleButton')
      );

    return (
        <div className='login-page'>
            <form onSubmit={loginSubmit}>
                <h2 style={{ "textAlign": "center" }}>Login</h2>
                <label name="email" htmlFor="email">Email:</label>
                <input id="email" type='email' name='email' required placeholder='Enter Your Email...' value={user.email} onChange={onChangeInput} />
                <label name="password" htmlFor="password">Password:</label>
                <input id="password" type='password' name='password' required placeholder='Enter Your Password...' value={user.password} onChange={onChangeInput} />
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