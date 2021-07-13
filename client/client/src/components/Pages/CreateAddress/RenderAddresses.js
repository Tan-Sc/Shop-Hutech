import React, { useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../GlobalState'

function RenderAddresses({ address, index, changeAddress }) {
    const state = useContext(GlobalState);
    const [token] = state.token
    const [addresses, setAddresses] = state.UserAPI.addresses

    const removeItem = () => {
        if (window.confirm('Do you want delete this item')) {
            addresses.splice(index, 1)
            // console.log(index);
            // console.log(addresses);
            setAddresses([...addresses]);
            refreshAddress(addresses)
        }
    }
    const refreshAddress = async (addresses) => {
        try {
            await axios.post('/user/remove', { addresses },
                {
                    headers: { Authorization: token }
                })
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className="render-address" onClick={changeAddress} key={index}>
            <h3 className='name'>Name: {address.name}</h3>
            <p className='phone'>Phone: {address.phone}</p>
            <p className='address'>Địa Chỉ: {address.inforAddress},{address.ward}, {address.district}, {address.city}</p>
            <p className='remove' onClick={removeItem}>X</p>
        </div>
    );
}

export default RenderAddresses;