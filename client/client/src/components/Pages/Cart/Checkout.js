import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'

import PaypalButton from './PaypalButton'
import RenderAddresses from '../../Pages/CreateAddress/RenderAddresses'

import axios from 'axios'

import gotoshoping from '../../../images/shopping.png'

function Checkout() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart;
    const [token] = state.token
    const [addresses] = state.UserAPI.addresses
    const [address, setAddress] = useState("");
    const [callback, setCallback] = state.ProductAPI.callback
    let payments;
    let deliveryCharges = 0;
    //console.log(cart);

    const addToCart = async (cart) => {
        // console.log(cart, "af");
        await axios.post('/user/addcart', { cart },
            {
                headers: { Authorization: token }
            })

    }
    //get address, phone
    const orderSubmit = async (payment) => {
        console.log(payment, 'payemnt');
        if (payment.paymentID) {
            payments = "Paid"
        }
        if (!address) return alert("You are not choose address");
        //if (!deliveryCharges) return alert("You are not choose address");
        try {
            if (cart.length === 0) {
                if (window.confirm('Your are have 0 items, Go to shopping')) {
                    window.location.href = '/products'
                }
            }
            await axios.post('/checkout', { cart, address: address, payments: payments, deliveryCharges, tax, total: total }, {
                headers: { Authorization: token }
            });
            setCart([]);
            addToCart([]);
            setCallback(!callback)
            alert('You have successfully ordered');
            // history.push('/products')
            window.location.href = '/products'
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    const changeAddress = (item, index) => {
        const chooseAddress = document.getElementsByClassName('choose')
        for (let i = 0; i < chooseAddress.length; i++) {
            if (chooseAddress[i].className === 'choose open') {
                chooseAddress[i].classList.remove('open')
            }
        }
        chooseAddress[index].classList.add('open');
        setAddress(item);
    }
    // const tranSuccess = async (payment) => {
    //     console.log(payment, 'ppm');
    //     const { paymentID, address } = payment
    //     await axios.post('/payment', { cart, address, paymentID }, {
    //         headers: { Authorization: token }
    //     });
    //     setCart([]);
    //     addToCart([]);
    //     alert('Ban da order thanh cong');
    // }
    if (cart.length === 0)
        return <div className="cart-empty">
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Order Empty</h2>
            <img src={gotoshoping} alt="..." />
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </div>
    const totalAllCart = cart.reduce((prev, item) => {
        return prev + item.count * item.prices
    }, 0)
    const tax = parseFloat((totalAllCart * 0.1).toFixed(1))
    if (address) {
        if (address.city.toLowerCase() === 'tp hồ chí minh') {
            deliveryCharges = 0;
        }
        else {
            deliveryCharges = 2;
        }
    }
    const total = totalAllCart + tax + deliveryCharges;
    return (
        <div className="check-out">
            <h2 className='out'>Checkout</h2>
            <div className="infor">
                <div className='inf'>
                    <h2>Choose delivery address</h2>
                    {
                        addresses.length === 0 ? <Link to='/address' className='create-address'>CreateAddress</Link> : <>
                            {
                                addresses.map((address, index) => {
                                    return <div className="choose">
                                        <RenderAddresses key={index} address={address} index={index} changeAddress={() => changeAddress(address, index)} />
                                    </div>
                                })
                            }
                        </>
                    }
                </div>
            </div>
            <div className="cart-box">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Prices</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(item => {
                                return <tr key={item._id}>
                                    <td className='images'>
                                        <img src={item.images} alt="..." />
                                    </td>
                                    <td className="title">{item.title}</td>
                                    <td className="quantity">
                                        <span>{item.count}</span>
                                    </td>
                                    <td className="prices">${item.prices}</td>
                                    <td className="total-prices">${item.count * item.prices}</td>

                                </tr>
                            })
                        }
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td>Tax</td>
                            <td>${tax}</td>
                        </tr>
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td>deliveryCharges</td>
                            <td>${deliveryCharges}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='total x'>
                    <input type="text" placeholder="Your Discount Code" className="discount" />
                </div >
                <div className='total'>
                    <h3>Grand Total: ${total}</h3>
                    <div className='choose-payment'>
                        <div className='home'>
                            <label>Payment at home</label>
                            <button onClick={orderSubmit}>Order </button>
                        </div>
                        <hr />
                        <div className='online'>
                            <label>Online Payment</label>
                            <PaypalButton total={total} tranSuccess={orderSubmit} />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default Checkout;