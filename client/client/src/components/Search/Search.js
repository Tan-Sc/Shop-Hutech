import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'

import { GlobalState } from '../GlobalState'
import loupe from '../../images/loupe.svg';
function Search({ search, handleOnChange }) {
    const state = useContext(GlobalState)
    const [search1, setSearch1] = state.ProductAPI.search
    let history = useHistory();
    const handleOnClick = async () => {
        search = search1;
        history.push('/products')
    }
    return (
        <div className="search">
            <input type="text" value={search} placeholder="Search"
                onChange={(handleOnChange) || (e => setSearch1(e.target.value.toLowerCase()))} />
            <div className="search-loupe" onClick={handleOnClick}>
                <img src={loupe} alt="" />
            </div>
        </div>
    );
}

export default Search;