import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../../images/background.jpg';

function RenderBlock() {
    return (
        <section className="blog">
            <div className="container">
                <h2 className="h2 upp align-center"> About Headline </h2>
                <hr className="offset-lg" />
                <div className="row">
                    <div className="col-sm-6 col-md-6 item">
                        <div className="body">
                            <Link to="#favorites" className="favorites"><i className="ion-ios-heart-outline" /></Link>
                            <Link to="/about"><img src={logo} alt="Apple iMac 27 Retina" /></Link>
                            <div className="caption">
                                <h2 className="h3">The next generation of Multi-Touch</h2>
                                <label> 07.01.2017</label>
                                <hr className="offset-sm" />
                                <p>
                                    The original iPhone introduced the world to Multi-Touch, forever changing the way people experience
                                    technology. With 3D Touch, you can do things that were never possible before. It senses how deeply you
                                    press the display, letting you do all kinds of essential things more quickly and simply. And it gives
                                    you real-time feedback in the form of subtle taps from the all-new Taptic Engine.
                    </p>
                                <hr className="offset-sm" />
                                <Link to='/about'>Test</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 item">
                        <div className="body">
                            <Link to="#favorites" className="favorites"><i className="ion-ios-heart-outline" /></Link>
                            <Link to="/about"><img src={logo} alt="Apple iMac 27 Retina" /></Link>
                            <div className="caption">
                                <h2 className="h3">MacBook Pro - brand new day for business.</h2>
                                <label> 02.01.2017</label>
                                <hr className="offset-sm" />
                                <p>
                                    Organizations everywhere are realizing the potential that Mac brings to their employees by giving them
                                    the freedom to use the tools they already know and love. Software and hardware made for each other.
                                    Because Apple designs both the software and hardware, every Mac delivers the best possible experience
                                    for employees.
                    </p>
                                <hr className="offset-sm" />
                                <Link to="/about">View article <i className="ion-ios-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default RenderBlock;