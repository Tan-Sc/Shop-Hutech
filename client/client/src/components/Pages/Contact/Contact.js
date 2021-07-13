import React from 'react';
import '../Contact/Contact.css'
function Contact() {
    return (
        <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
            <div className="wrapper wrapper--w680">
                <div className="card card-1">
                    <div className="card-heading" />
                    <div className="card-body">
                        <h2 className="title">Contact Us</h2>
                        <form method="POST">
                            <div className="row row-space">
                                <div className="col-2">
                                    <div className="input-group">
                                        <input className="input--style-1 js-datepicker" type="text" placeholder="Name" name="birthday" />
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row row-space">
                                <div className="col-2">
                                    <div className="input-group">
                                        <input className="input--style-1" type="text" placeholder="Email" name="res_code" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <input className="input--style-1" type="text" placeholder="Comment" name="name" />
                            </div>
                            <div className="p-t-20">
                                <button className="btn btn--radius btn--green" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;