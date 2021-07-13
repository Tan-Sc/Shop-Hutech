import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../GlobalState'
import axios from 'axios'

import RenderUser from './RenderUser'
import Loadding from '../../Loadding/Loadding'

function AdminUser() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [users, setUsers] = useState([])
    const [callback, setCallback] = state.UserAPI.callback

    const handleOnChangeAccount = async (user) => {
        if (user.isBlock === true) {
            if (window.confirm("Are you sure you want to open this account")) {
                await axios.post(`/user/block/${user._id}`, { isBlock: !user.isBlock }, {
                    headers: { Authorization: token }
                })
                setCallback(!callback);
                return alert("Opened Account");
            }
        }
        if (user.isBlock === false) {
            if (window.confirm("Are you sure you want to delete this account")) {

                await axios.post(`/user/block/${user._id}`, { isBlock: !user.isBlock }, {
                    headers: { Authorization: token }
                })
                localStorage.removeItem('firstLogin')
                setCallback(!callback);
                return alert("Blocked Account");
            }
        }
    }
    useEffect(() => {
        // console.log(token, 'tk');
        if (token) {
            const getAllUser = async () => {
                try {
                    const res = await axios.get('/user/users', {
                        headers: { Authorization: token }
                    });
                    //console.log(res.data.users);
                    setUsers(res.data.users)
                } catch (error) {
                    alert(error)
                }
            }
            getAllUser();
        }
    }, [token, callback])
    // console.log(users, 'xxx');
    // if (users.length === 0) return null
    return (
        <div className='all-users'>
            <h2 className='title'>Users Management</h2>
            {
                users.length > 0 && <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Create</th>
                            <th>Date Update</th>
                            <th>Block Acount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                if (user.role === 1) return null
                                return <RenderUser key={index} user={user} token={token} handleOnChangeAccount={() => handleOnChangeAccount(user)} />
                            })
                        }
                    </tbody>
                </table>
            }
            {users.length === 0 && <Loadding />}
        </div>
    );
}

export default AdminUser;