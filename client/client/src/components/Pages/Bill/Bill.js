import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import './Bill.css';

function Bill() {
    const state = useContext(GlobalState);
    const [history] = state.UserAPI.history;
    const [bill, setBill] = useState([]);
    const params = useParams()
    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setBill(item)
            });
        }
    }, [params.id, params, history])
    if (bill.length === 0) return null
    const printPDF = async () => {
        const domElement = document.getElementById("print-bill");
        html2canvas(domElement, {
            onclone: document => {
                document.getElementById("print");
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPdf();
            pdf.addImage(imgData, "JPEG", -115, 40);
            pdf.save(`${new Date().toISOString()}.pdf`);
        });
    };

    return (

        <div className="invoice-box">
            <button id="print" onClick={printPDF}>
                PRINT
            </button>
            <div id='print-bill'>
                <div id="invoice-POS">
                    <center id="top">
                        <div className="logo" />
                        <i className="fab fa-accusoft"></i>
                        <div className="info">
                            <h2>HUTECH-Shop</h2>
                        </div>{/*End Info*/}
                    </center>{/*End InvoiceTop*/}
                    <div id="mid">
                        <div className="info">
                            <h2>Contact Info</h2>
                            <p>
                                Address : {bill.address.inforAddress} {bill.address.ward} {bill.address.district} {bill.address.city}<br />
                            Email   : {bill.address.email}<br />
                            Phone   : {bill.address.phone}<br />
                            </p>
                        </div>
                    </div>{/*End Invoice Mid*/}
                    <div id="bot">
                        <div id="table">
                            <table>
                                <thead>
                                    <tr className="tabletitle">
                                        <th className="item"><h2>Item</h2></th>
                                        <th className="Hours"><h2>Quantity</h2></th>
                                        <th className="Hours"><h2>Prices</h2></th>
                                        <th className="Rate"><h2>Sub Total</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bill.cart.map(item => (
                                            <tr className="service" key={item._id}>
                                                <td className="tableitem">{item.title}</td>
                                                <td className="tableitem">{item.count}</td>
                                                <td className="tableitem">${item.prices}</td>
                                                <td className="tableitem">${item.count * item.prices}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr className="tabletitle">
                                        <td />
                                        <td />
                                        <td className="Rate"><h2>tax</h2></td>
                                        <td className="payment"><h2>{bill.tax}</h2></td>
                                    </tr>
                                    <tr className="tabletitle">
                                        <td />
                                        <td />
                                        <td className="Rate"><h2>Delivery Charges</h2></td>
                                        <td className="payment"><h2>{bill.deliveryCharges}</h2></td>
                                    </tr>
                                    <tr className="tabletitle">
                                        <td />
                                        <td />
                                        <td className="Rate"><h2>Total</h2></td>
                                        <td className="payment"><h2>${bill.total}</h2></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>{/*End Table*/}
                        <div id="legalcopy">
                            <p className="legal"><strong>Thank you for your business!</strong>&nbsp; Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
                            </p>
                        </div>
                    </div>{/*End InvoiceBot*/}
                </div>
            </div>
        </div>
    );
}

export default Bill;