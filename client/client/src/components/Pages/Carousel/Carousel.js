import React from 'react'
import { Carousel } from 'react-bootstrap'

import './Carousel.css'

import imageslide from '../../../images/bg.jpg'
import imageslide1 from '../../../images/bg2.jpg'
import imageslide2 from '../../../images/bg3.jpg'

function ControlledCarousel() {
    // const [index, setIndex] = useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // };

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imageslide2}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Mouse Computer</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imageslide1}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>HeadPhone</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imageslide}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>LapTop</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;