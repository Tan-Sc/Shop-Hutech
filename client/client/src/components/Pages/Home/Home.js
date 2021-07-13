import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import "./Home.css"

// import harddisk from '../../../images/harddisk.svg'
// import headphone from '../../../images/headphones.svg'
// import ram from '../../../images/ram.svg'
// import mouse from '../../../images/mouse.svg'
import laptop from '../../../images/laptop.svg'

// import RenderBlog from './RenderBlog'
import Carousel from '../../Pages/Carousel/Carousel'
import RenderHome from './RenderHome';
import AdminHome from '../../Admin/AdminHome/AdminHome'
// import Loadding from '../../Loadding/Loadding';

function Home() {
    const state = useContext(GlobalState)
    const [hotLaptops] = state.ProductAPI.hotLaptops;
    const [isAdmin] = state.UserAPI.isAdmin
    const [hotMouses] = state.ProductAPI.hotMouses;
    const [hotHeadphones] = state.ProductAPI.hotHeadphones;
    const [categories] = state.CategoryAPI.categories
    return (
        <>
            {!isAdmin ? <div className="user-home">
                <div className="box-header">
                    <Carousel />
                    <div className="category-sp">
                        <ul>
                            <li style={{ "background": "rgb(243 238 238)" }}>Product Portfolio</li>
                            {
                                categories.map((category, index) => {
                                    return <li key={index}><Link to={`/products/category/${category._id}`}><img src={laptop} alt="..." /> {category.name}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="hot-products">
                    <p className="overview">A few types of best-selling products</p>
                    <div className="hot-laptops"><RenderHome items={hotLaptops.slice(0, 5)} /></div>
                    <div className="hot-mouses"><RenderHome items={hotMouses.slice(0, 5)} /></div>
                    <div className="hot-headphone"><RenderHome items={hotHeadphones.slice(0, 5)} /></div>
                </div>
            </div> :
                <AdminHome />
            }
        </>
    );
}
export default Home;