import React from 'react'
import { Link } from 'react-router-dom'

function ClientHeader({ logoutUser, uimg, check, v, cart, user }) {
    return (
        <>
            <div className="client">
                <Link to="/home">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="cart-icon">
                <Link to='/cart' onClick={check}>
                    <img src={v} alt=""></img>
                    <span>{cart.length}</span>
                </Link>
            </div>
            <div className='user'>
                <img src={uimg} alt="" className="user-img" />
                <div className="user-content">{user.name}
                    <ul className='form-action'>
                        <li><Link to="/address">List Addresses</Link></li>
                        <li><Link to="/history">Transaction History</Link></li>
                        <li><Link to={`/changepassword`}>Change Password</Link></li>
                        <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default ClientHeader;