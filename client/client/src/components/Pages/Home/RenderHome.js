import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'



function RenderHome({ items }) {
    const state = useContext(GlobalState)
    const addCart = state.UserAPI.addCart;
    const [categories] = state.CategoryAPI.categories

    if (items.length === 0) return null
    return (
        <section className="products-home">
            <div className="box-products">
                <h2 className="text">{items[0].category + `s`}</h2>
                <div className="render-items">
                    {

                        items.map(item =>
                            <div className="product-item" key={item._id}>
                                <img src={item.images.url} alt="Apple iMac 27 Retina" />
                                <div className="content">
                                    <p className="price">${item.prices}</p>
                                    <h2 className="h3">{item.title}</h2>
                                    <p className="des">{item.description}</p>
                                    <div className="add-cart">
                                        <Link to={`/products/detail/${item._id}`} className="view-detail"> Details</Link>
                                        <button onClick={() => addCart(item)} className="addcart"> Add to cart</button>
                                    </div>
                                </div>
                                <p className='solded'>solded: {item.sold}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="align-right align-center-xs">
                <hr className="offset-sm" />
            </div>
            {categories.length > 0 && <Link to={`/products/category/${categories.find(item => item.name === items[0].category)._id}`}><h5 className="upp">View all {items[0].category}s</h5></Link>}
        </section >
    );
}

export default RenderHome;