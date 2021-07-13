import React, { useEffect, useState } from 'react';
import axios from 'axios'

function RenderUser({ user, handleOnChangeAccount }) {
    return (
        <tr>
            <td>{user.name}</td>
            <td className='user-email'>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
            <td>{user.isBlock === false
                ? <button className='block-account' onClick={() => handleOnChangeAccount(user)}>BlockAcount</button>
                : <button className='open-account' onClick={() => handleOnChangeAccount(user)}>Open Account</button>}</td>
        </tr>
    );
}

export default RenderUser;