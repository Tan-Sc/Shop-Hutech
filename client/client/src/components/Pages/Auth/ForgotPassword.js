import React, { useState } from 'react';

import axios from 'axios'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const onChangeInput = (e) => {
        setEmail(e.target.value)
    }
    const forgotSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/forget', { email });
            localStorage.setItem('isReset', true)
            return alert(res.data.msg)
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    return (
        <div className="forgot">
            <h2>Forgot Your Password?</h2>
            <form onSubmit={forgotSubmit}>
                <label name="email" htmlFor="email">Email:</label>
                <input id="email" type='email' name='email' required placeholder='Enter Your Email...' value={email} onChange={onChangeInput} />
                <div className='row-auth'>
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;