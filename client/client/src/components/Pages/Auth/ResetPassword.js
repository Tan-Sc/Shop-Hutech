import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

function ResetPassword() {
    const accesstoken = useParams();
    const history = useHistory();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const isReset = localStorage.getItem('isReset')
    const Test = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                return alert("password confirmation failed");
            }
            if (!isReset) return alert("Error :)))")
            const res = await axios.post(`/user/reset/${accesstoken.id}`, {
                password: password
            })
            localStorage.removeItem('isReset')
            history.push('/login')
            return alert(res.data.msg)
        } catch (error) {
            console.log('llll');
            return alert(error.response.data.msg);
        }
    }
    const inputPassword = (e) => {
        setPassword(e.target.value);
    }
    const inputComfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <form onSubmit={Test}>
                <div className="box-reset">
                    <label name="password" htmlFor="password">Password:</label>
                    <input id="password" type='password' name='password' required placeholder='New Password...' value={password} onChange={inputPassword} />
                </div>
                <div className="box-reset">
                    <label name="confirmpassword" htmlFor="confirmpassword">Confirm Password:</label>
                    <input id="confirmpassword" type='confirmpassword' name='confirmpassword' required placeholder='Comfirm Password...' value={confirmPassword} onChange={inputComfirmPassword} />
                </div>
                <div className='row-auth'>
                    <button type='submit'>Reset Password</button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;