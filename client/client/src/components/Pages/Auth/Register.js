import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    })
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })

            localStorage.setItem('firstLogin', true)


            window.location.href = '/'
        } catch (error) {
            //console.log(error.response);
            alert(error.response.data.msg)
        }
    }
    return (
        <div className='login-page' style={{top:"50px"}}>
            <form onSubmit={registerSubmit}style={{height:"600px"}}>
                <h2 style={{ "textAlign": "center" }}>Register</h2>
                <label name="name" htmlFor="email">Name:</label>
                <input id="name" type='text' name='name' required placeholder='Enter Your Name...' value={user.name} onChange={onChangeInput} />
                <label name="email" htmlFor="email">Email:</label>
                <input id="email" type='email' name='email' required placeholder='Enter Your Email...' value={user.email} onChange={onChangeInput} />
                <label name="password" htmlFor="password">Password:</label>
                <input id="password" type='password' name='password' required placeholder='Enter Your Password...' value={user.password} onChange={onChangeInput} />
                <div className='row-auth'>
                    <button type='submit'>Registe</button>
                    <small>Back to Login</small>
                    <Link to='/login'>
                        <button className="register">Login</button></Link>
                </div>
            </form>
        </div>
    );
}

export default Register;