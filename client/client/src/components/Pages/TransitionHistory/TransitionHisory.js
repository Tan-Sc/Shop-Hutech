import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../GlobalState';

import exportbill from '../../../images/export.svg';
import Loadding from '../../Loadding/Loadding';
import Pagination from '../../Pagination/Pagination'

function TransitionHisory() {
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history
    const [isAdmin] = state.UserAPI.isAdmin
    const [page, setPage] = state.UserAPI.page
    const [token] = state.token
    const [callback, setCallback] = state.UserAPI.callback

    // const handleOnChange = async (item) => {
    //     try {
    //         await axios.post(`/checkout/${item._id}`, { status: !item.status },
    //             {
    //                 headers: { Authorization: token }
    //             }
    //         )
    //         setCallback(!callback)
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }
    const handlePageChange = (page) => {
        setPage(page)
    }
    const checkOrder = async (item) => {
        try {
            console.log(item._id);
            await axios.post(`/checkout/${item._id}`, { status: true }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
        } catch (error) {
            alert(error.message)
        }
    }
    const dropOrderChange = async (item) => {
        if (window.confirm("Do you want cancel this order")) {
            if (!item.status) {
                console.log(item);
                try {
                    await axios.delete(`/checkout/delete/${item._id}`, {
                        headers: { Authorization: token }
                    })
                    alert("Canceled this order")
                    setCallback(!callback)
                } catch (error) {
                    alert(error.message)
                }
            }
            else return alert("error.message")
        }
    }
    // if (history.length === 0) {
    //     setPage(1)
    // }
    return (
        <div className='bill'>
            <div className='trans-history'>
                <h2>Transition History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>TransID</th>
                            <th>Date Purchase</th>
                            <th>Status</th>
                            <th>View Detail</th>
                            {isAdmin ? <th>Payments</th> : <th>Protocol</th>}
                            {isAdmin ? <th>Export Bill</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='id-trans'>{item._id}</td>
                                        <td className='dateOrder'>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td>{item.status ? 'Confirmed' : 'Are Confirming'}</td>
                                        <td className='view-detail'>
                                            <Link to={`/history/${item._id}`}>View Detail</Link>
                                        </td>
                                        {isAdmin ? <td>{item.payments}</td> : <td>{
                                            item.status ? <button disabled style={{ "background": "#b1acaca6", "padding": "5px 10px" }}>Received</button> :
                                                <button style={{ "background": "rgb(255 0 0 / 72%)", "padding": "5px 20px" }} onClick={() => dropOrderChange(item)}>Cancel</button>
                                        }</td>}
                                        {isAdmin ? <td><Link to={`/bill/${item._id}`} className='ex-bill'><img onClick={() => checkOrder(item)} src={exportbill} alt="exportbillx" /></Link></td> : null}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {history.length === 0 && <Loadding />}
            <Pagination page={page} handlePageChange={handlePageChange} products={history} />
        </div >
    );
}

export default TransitionHisory;