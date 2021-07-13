import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

function AdminHeader({ logoutUser, user }) {
    let className = 'dis'
    const click = () => {
        if (className === 'dis') {
            className += ' hihi'
        }
        else {
            className = 'dis'
        }
        console.log(className);
    }
    return (
        <header>
            <div className='nav-bar'>
                <button onClick={click}>hihihaha</button>
                <p>{user.name}</p>
            </div>
            <div className={className}>
                <ul>
                    <li><Link to="/home">Home</Link> </li>
                    <li> <Link to="/products">Products</Link></li>
                    <li><Link to='/products/create'>Create Product</Link></li>
                    <li><Link to='/category'>Categories</Link></li>
                    <li><Link to="/history">History Order</Link></li>
                    <li><Link to='/logout' onClick={logoutUser}>Logout</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default AdminHeader;