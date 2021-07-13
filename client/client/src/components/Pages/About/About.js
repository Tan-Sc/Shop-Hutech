import React from 'react';
import { Link } from 'react-router-dom'

import "../About/About.css"

import logo from '../../../images/bg2.jpg'
import about from '../../../images/about.jpg'

function About() {
    return (
        <div className="about">
            <div id="page-wrapper">
                <div id="welcome" className="container">
                    <div className="title">
                        <h2>Welcome to our website</h2>
                    </div>
                    <p>This is <strong>EarthyBlue</strong>, a free, fully standards-compliant CSS template designed by <Link href="http://templated.co" rel="nofollow">TEMPLATED</Link>. The photos in this template are from <Link href="http://fotogrph.com/"> Fotogrph</Link>. This free template is released under the <Link href="http://templated.co/license">Creative Commons Attribution</Link> license, so you're pretty
              much
              free to do whatever you want with it (even use it commercially) provided you give us credit for it.
              Have
              fun :) </p>
                    <img src={logo} className="image image-full" alt="" />
                </div>
            </div>
            <div className="wrapper">
                <div id="three-column" className="container">
                    <div><span className="arrow-down" /></div>
                    <div id="tbox1">
                        <div className="title">
                            <h2>Fast Shipping</h2>
                        </div>
                        <p>Nullam non wisi a sem semper eleifend. Donec mattis libero eget urna. Duis pretium velit ac
                        suscipit
                mauris. Proin eu wisi suscipit nulla suscipit interdum.</p>
                        <Link href="#" className="button">Learn More</Link>
                    </div>
                    <div id="tbox2">
                        <div className="title">
                            <h2>Products Variety</h2>
                        </div>
                        <p>Proin eu wisi suscipit nulla suscipit interdum. Nullam non wisi a sem semper suscipit eleifend.
                        Donec
                mattis libero eget urna. Duis velit ac mauris.</p>
                        <Link href="#" className="button">Learn More</Link>
                    </div>
                    <div id="tbox3">
                        <div className="title">
                            <h2>Fast Handling</h2>
                        </div>
                        <p>Donec mattis libero eget urna. Duis pretium velit ac mauris. Proin eu wisi suscipit nulla
                        suscipit
                interdum. Nullam non wisi a sem suscipit eleifend.</p>
                        <Link href="#" className="button">Learn More</Link>
                    </div>
                </div>
                <div id="portfolio" className="container">
                    <div className="column1">
                        <div className="box"> <Link href="#"><img src={about} alt="" className="image image-full" /></Link>
                            <h3>Vestibulum venenatis</h3>
                            <p>Fermentum nibh augue praesent a lacus at urna congue rutrum.</p>
                            <Link href="#" className="button button-small">Etiam posuere</Link>
                        </div>
                    </div>
                    <div className="column2">
                        <div className="box"> <Link href="#"><img src={about} alt="" className="image image-full" /></Link>
                            <h3>Praesent scelerisque</h3>
                            <p>Vivamus fermentum nibh in augue praesent urna congue rutrum.</p>
                            <Link href="#" className="button button-small">Etiam posuere</Link>
                        </div>
                    </div>
                    <div className="column3">
                        <div className="box"> <Link href="#"><img src={about} alt="" className="image image-full" /></Link>
                            <h3>Donec dictum metus</h3>
                            <p>Vivamus fermentum nibh in augue praesent urna congue rutrum.</p>
                            <Link href="#" className="button button-small">Etiam posuere</Link>
                        </div>
                    </div>
                    <div className="column4">
                        <div className="box"> <Link href="#"><img src={about} alt="" className="image image-full" /></Link>
                            <h3>Mauris vulputate dolor</h3>
                            <p>Rutrum fermentum nibh in augue praesent urna congue rutrum.</p>
                            <Link href="#" className="button button-small">Etiam posuere</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;