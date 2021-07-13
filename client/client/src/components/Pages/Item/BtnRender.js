import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import edit from '../../../images/edit.svg'
import remove from '../../../images/remove.svg'

function BtnRender({ product, deleteProduct }) {
    //console.log(product);
    const state = useContext(GlobalState);
    const [isAdmin] = state.UserAPI.isAdmin;
    const addCart = state.UserAPI.addCart;

    return (
        <div className="row_btn">
            {isAdmin ?
                <>
                    <Link id="btn_buy" to={`/products/create/${product._id}`} >
                        <img src={edit} alt='...'></img>
                    </Link>
                    <Link id="btn_view" to="#" onClick={deleteProduct}>
                        <img src={remove} alt='...'></img>
                    </Link>
                </> :
                <>
                    <Link id="btn_buy" to="/products" onClick={() => addCart(product)}>
                        Add Cart
                    </Link>
                    <Link id="btn_view" to={`/products/detail/${product._id}`}>
                        View Detail
                    </Link>
                </>
            }
        </div>
    );
}

export default BtnRender;