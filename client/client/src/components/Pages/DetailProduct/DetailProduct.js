import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import ProductItem from '../Item/ProductItem'
import RenderContent from './RenderContent'

function DetailProduct() {
    let count = 0;
    let componentItem = [];
    let desItem = [];
    const idProduct = useParams();
    const state = useContext(GlobalState);
    const addCart = state.UserAPI.addCart;
    // const [products] = state.ProductAPI.products;
    const [allproducts] = state.ProductAPI.allproducts
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (idProduct) {
            allproducts.forEach(product => {
                //console.log(product);
                if (product._id === idProduct.id) setDetailProduct(product);
            })
        }
    }, [idProduct.id, allproducts, idProduct])
    // console.log(detailProduct);
    if (detailProduct.length === 0) return null
    const showContent = (objects) => {
        console.log(objects);
        for (let key in objects) {
            componentItem.push(key)
            desItem.push(objects[key])
        }
    }
    showContent(detailProduct.content)
    return (
        <div className='boxx-detail'>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row-dt">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.category}</h6>
                    </div>
                    {
                        detailProduct.content &&
                        <div className="content">
                            <span className="infor">---Infor Products---- </span>
                            <table>
                                <thead className="show-content">
                                    <tr>
                                        <th>Component</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <RenderContent desItem={desItem} componentItem={componentItem} />
                            </table>
                        </div>
                    }
                    <div className="row-price">
                        <p>Price: ${detailProduct.prices}</p>
                    </div>
                    {detailProduct.isDelete === true ? <p>Sold out</p> :
                        <Link to="/cart" className="cart-buy" onClick={() => addCart(detailProduct)}>Buy Now</Link>}
                </div>
            </div>
            <div className="related-products">
                <h2>Products Related</h2>
                <div className="products">
                    {
                        allproducts.map(product => {
                            //console.log(limitRelated);
                            if (product.category === detailProduct.category && product.isDelete === false && product._id !== detailProduct._id) {
                                count++;
                                if (count >= 6) return null
                                return <ProductItem key={product._id} product={product} />
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;