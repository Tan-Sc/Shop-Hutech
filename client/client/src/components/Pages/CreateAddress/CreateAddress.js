import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../../GlobalState'

import RenderAddresses from './RenderAddresses'
import Loadding from '../../Loadding/Loadding';

const initialState = {
    name: '',
    phone: '',
    email: '',
    inforAddress: ''
}
let className = 'create-address'
function Address() {
    const state = useContext(GlobalState);
    const [token] = state.token
    const [addresses] = state.UserAPI.addresses
    const [callback, setCallback] = state.UserAPI.callback
    const [cities] = state.UserAPI.cities

    const [address, setAddress] = useState(initialState)
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [onDisplay, setOndisplay] = useState(false)


    useEffect(() => {
        const getOneCity = cities.find(item => {
            return city === item.Title
        })
        //getNameCity để lấy ID
        if (getOneCity) {
            const id = getOneCity.ID
            const getCity = async () => {
                const res = await axios.get(`https://thongtindoanhnghiep.co/api/city/${id}/district`);
                setDistricts(res.data)
            }
            getCity();
        }
    }, [city, cities])
    useEffect(() => {
        const getOneDistrict = districts.find(item => {
            return district === item.Title
        })
        if (getOneDistrict) {
            const id = getOneDistrict.ID
            const getCity = async () => {
                const res = await axios.get(`https://thongtindoanhnghiep.co/api/district/${id}/ward`);
                setWards(res.data)
            }
            getCity();
        }
    }, [district, districts])
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
    }
    const handleChangeCity = (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
        setCity(value)
        setDistricts([])
        setWards([])
    }
    const handleChangeDistrict = (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
        setDistrict(value)
        setWards([])
    }
    const handleChangeWard = (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
        setWard(value)
    }
    const createOrUpdateAddress = async (e) => {
        e.preventDefault();
        if (!address.name || !address.phone || !address.email || (!city || city === "Select a City") ||
            (!district || district === "Select a District") || (!ward || ward === "Select a Ward"))
            return alert("Please fill out the form completely")
        try {
            await axios.post(`/user/address`, { ...address }, {
                headers: { Authorization: token }
            })
            setDistricts([]);
            setWards([]);
            setCity("")
            setDistrict("")
            setWard("")
            setAddress(initialState);
        } catch (error) {
            return alert(error.response.data.msg)
        }
        setCallback(!callback)
        className = 'create-address';
        return alert("add address")
    }
    const showModal = () => {
        className += ' show'
        console.log(onDisplay);
        setOndisplay(!onDisplay)
    }
    const CancleCreate = () => {
        className = 'create-address'
        console.log(onDisplay);
        setOndisplay(!onDisplay)
    }

    return (
        <div className='list-addresses'>
            <h2 className='title-address'>Addresses-Book</h2>
            <h3 className='new-address' onClick={showModal}>+ Add new address</h3>
            <div className='display-addresses'>
                {
                    address.length === 0 && <Loadding />
                }
                {
                    addresses.map((address, index) => {
                        return <RenderAddresses address={address} key={index} index={index} />
                    })
                }
            </div>
            <div className={className}>
                <form onSubmit={createOrUpdateAddress}>
                    <div className="hang">
                        <div className='your-infor'>
                            <h2>Your Information</h2>
                            <div className='name'>
                                <label htmlFor='name'>Name: </label>
                                <input type='text' id='name' name='name' placeholder='fullName' onChange={handleChangeInput} value={address.name} />
                            </div>
                            <div className='phone'>
                                <label htmlFor='phone'>Phone: </label>
                                <input type='text' id='phone' name='phone' placeholder='Phone' onChange={handleChangeInput} value={address.phone} />
                            </div>
                            <div className='email'>
                                <label htmlFor='email'>email: </label>
                                <input type='email' id='email' name='email' placeholder='email' onChange={handleChangeInput} value={address.email} />
                            </div>
                        </div>
                        <div className='address-receive'>
                            <h2>Address Receive</h2>
                            <div className='city'>
                                <select name='city' onChange={handleChangeCity}>
                                    <option>Select a City</option>
                                    {
                                        cities.map((city) => {
                                            return <option key={city.ID} id={city.ID}> {city.Title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <select name='district' onChange={handleChangeDistrict}>
                                <option>Select a District</option>
                                {
                                    districts.map((district) => {
                                        return <option key={district.ID} id={district.ID}> {district.Title}</option>
                                    })
                                }
                            </select>
                            <select name='ward' onChange={handleChangeWard}>
                                <option>Select a Ward</option>
                                {
                                    wards.map((ward) => {
                                        return <option key={ward.ID} id={ward.ID}> {ward.Title}</option>
                                    })
                                }
                            </select>
                            <div className='inforAddress'>
                                <label htmlFor='inforAddress'>Address: </label>
                                <input type='inforAddress' id='inforAddress' name='inforAddress' placeholder='Address' onChange={handleChangeInput} value={address.inforAddress} />
                            </div>
                        </div>
                    </div>
                    <div className='fold'>
                        <button type='submit' className='save'>Save</button>
                        <p className='cancle' onClick={CancleCreate}>Cancle</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Address;