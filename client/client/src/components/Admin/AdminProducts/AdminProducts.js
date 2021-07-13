import axios from 'axios';
import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import BtnRender from '../../Pages/Item/BtnRender'


function AdminProducts({ product, token }) {
    const state = useContext(GlobalState)
    const [callback, setCallback] = state.ProductAPI.callback
    const deleteProduct = async () => {
        try {
            if (window.confirm("Do you really deleted this product")) {
                // const deleteImg = await axios.post('/images/delete', { public_id: product.images.public_id }, {
                //     headers: { Authorization: token }
                // })
                const deleteProduct = await axios.post(`/products/delete/${product._id}`, {
                    headers: { Authorization: token }
                })
                // await deleteImg
                await deleteProduct
                setCallback(!callback)
            }
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    if ((product.isDelete === true)) {
        return null
    }
    return (
        <tr key={product._id}>
            <td className='images'>
                <img src={product.images.url} alt='product'></img>
            </td>
            <td className="title">{product.title}</td>
            <td className="quantity">{product.quantity}</td>
            <td className="prices">{product.prices}$</td>
            <td className="category">{product.category}</td>
            <td className="sold">{product.sold}</td>
            <td className="update-or-drop">
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </td>
        </tr>
    )
}

export default AdminProducts;