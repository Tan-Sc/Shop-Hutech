import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState'

function Sort() {
    const state = useContext(GlobalState)
    const [sort, setSort] = state.ProductAPI.sort
    const [page, setPage] = state.ProductAPI.page
    const handleSort = (e) => {
        setSort(e.target.value)
        setPage(1);
    }
    return (
        <div className="sort-menu">
            <div className="row">
                <span>SortBy: </span>
                <select value={sort} onChange={handleSort}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-prices">Price: Hight-Low</option>
                    <option value="sort=prices">Price: Low-Hight</option>
                    <option value="sort=-sold">Hot Items: High-Low</option>
                    {/* <option value=""></option> */}
                </select>
            </div>
        </div>
    );
}

export default Sort;