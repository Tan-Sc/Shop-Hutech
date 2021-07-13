import React from 'react';
import "./dasboard.css";
import axios from 'axios'
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';
export default function Dasboard() {
    const logoutUser = async () => {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin')
        window.location.href = '/login'
    }
    return (
        <div className="left-nav">
            <div className="nav-title">
                <h2>Dasboard</h2>
            </div>
            <div className="general">
                <div className="item">
                    <img src={logo} alt="..." /><Link to="/dasboard/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>HOME</Link>
                </div>
                <div className="item">
                    <img src={logo} alt="..." /><Link to="/admin/users" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>USER</Link>
                </div>
                <div className="item">
                    <img src={logo} alt="..." /><Link to="/products/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>PRODUCTS</Link>
                </div>
                <div className="item">
                    <img src={logo} alt="..." /><Link to='/category' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>CATEGORY</Link>
                </div>
                <div className="item">
                    <img src={logo} alt="..." /><Link to='/history' style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>HISTORY ORDER</Link>
                </div>
                <div className="item">
                    <img src={logo} alt="..." /><Link to='/logout' onClick={logoutUser} style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>LOGOUT</Link>
                </div>
            </div>
        </div>
    );
}
