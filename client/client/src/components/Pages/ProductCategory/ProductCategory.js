import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

import ProductItem from '../Item/ProductItem'
import Loadding from '../../Loadding/Loadding'
// import Search from '../../Search/Search'
import Pagination from '../../Pagination/Pagination'

import './ProductCategory.css';

const perPage = 10; //x

function ProductCategory() {
    const state = useContext(GlobalState);
    // const [page, setPage] = state.ProductAPI.page
    const [allproducts] = state.ProductAPI.allproducts
    // const [searchItem, setSearchItem] = state.ProductAPI.search
    const [categories] = state.CategoryAPI.categories
    const [category, setCategory] = useState('')
    const [allItems, setAllItems] = useState([]);
    const [page, setPage] = useState(1)
    const [loadding, setLoadding] = useState(false)
    const param = useParams()

    const handlePageChange = (page) => {
        console.log(page, 'page');
        setPage(page)
    }


    useEffect(() => {
        const start = (page - 1) * perPage;
        const end = (page * perPage);
        if (param.id) {
            categories.forEach(x => {
                //console.log(product);
                if (x._id === param.id) setCategory(x);
            })
            if (allproducts.length === 0) {
                setLoadding(true)
            }
            else {

                const y = allproducts.filter(product => {
                    return product.category === category.name
                })
                console.log(y, 'y');
                setAllItems(y.splice(start, end));
                setLoadding(false)
            }
        }
    }, [param.id, categories, allproducts, category, page])
    // const handleOnChange = (e) => {
    //     setSearchItem(e.target.value.toLowerCase())
    // }
    return (
        <>
            {loadding ? <Loadding /> : <div className="category-items">
                <div className="related-products">
                    {/* <Search search={searchItem} handleOnChange={handleOnChange} /> */}
                    <h2>{category.name}</h2>
                    <div className="products">
                        {
                            allItems.map(product => {
                                //console.log(limitRelated);
                                return <ProductItem key={product._id} product={product} />
                            })
                        }
                    </div>
                </div>
                {/* <Pagination page={page} handlePageChange={handlePageChange} products={products} /> */}
                <Pagination handlePageChange={handlePageChange} products={allItems} page={page} />
            </div>}
        </>
    );
}

export default ProductCategory;