import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import gotoshoping from '../../../images/shopping.png'
// import Loadding from '../../Loadding/Loadding';
// import PaypalButton from './PaypalButton'
import RenderCart from './RenderCart'

function Cart() {
    const state = useContext(GlobalState)
    //console.log(state);
    const [cart] = state.UserAPI.cart;
    //const [isLogged] = useState(false)
    const [total, setTotal] = useState(0);
    useEffect(() => {
        console.log(cart, 'cart');
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.count * item.prices
            }, 0)
            setTotal(total)
        }
        getTotal();
    }, [cart])
    if (cart.length === 0)
        return <div className="cart-empty">
            <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>
            <img src={gotoshoping} alt="..." />
            <Link to='/products' className="shopping">Go to Shopping</Link>
        </div>
    return (
        <div className="cart-box">
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>prices</th>
                        <th>Quantity</th>
                        <th>totalPrice</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index) => {
                            return <RenderCart item={item} key={index} />
                        })
                    }
                </tbody>
            </table>
            <div className='total'>
                <h3>Total: ${total}</h3>
                <Link to='/checkout' className='check'>Checkout</Link>
            </div>
        </div>
    );
}
export default Cart;
