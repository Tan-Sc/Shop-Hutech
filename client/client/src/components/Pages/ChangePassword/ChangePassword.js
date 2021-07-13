import React, { useContext, useState } from 'react';
// import { useParams } from 'react-router-dom'

import { GlobalState } from '../../GlobalState'

import axios from 'axios'

function ChangePassword({ user }) {
    console.log(user);
    const state = useContext(GlobalState)
    const [token] = state.token

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const onChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    const onChangeNewPassword = (e) => {
        e.preventDefault()
        setNewPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        e.preventDefault()
        setConfirmPassword(e.target.value)
    }
    const logoutUser = async () => {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin')
        window.location.href = '/login'
    }
    const changePasswordSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/user/changepassword/${user._id}`, { password: password, newPassword: newPassword, confirmPassword: confirmPassword },
                {
                    headers: { Authorization: token }
                }
            )
            logoutUser();
            return alert(res.data.msg)
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    return (
        <div className="reset-password">
            <h2>Change Password</h2>
            <form onSubmit={changePasswordSubmit}>
                <div className="box-reset">
                    <label name="password" htmlFor="password">Your Password:</label>
                    <input id="password" type='password' name='password' required placeholder='Your Password...'
                        value={password} onChange={onChangePassword} />
                </div>
                <div className="box-reset">
                    <label name="newPassword" htmlFor="newPassword">New Password:</label>
                    <input id="newPassword" type='password' name='newPassword' required placeholder='New Password...'
                        value={newPassword} onChange={onChangeNewPassword} />
                </div>
                <div className="box-reset">
                    <label name="confirmPassword" htmlFor="confirmPassword">Confirm Password:</label>
                    <input id="confirmPassword" type='password' name='confirmPassword' required placeholder='Confirm Password...'
                        value={confirmPassword} onChange={onChangeConfirmPassword} />
                </div>
                <div className='row-auth'>
                    <button type='submit'>Change Password</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;