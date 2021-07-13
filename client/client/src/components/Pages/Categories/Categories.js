import axios from 'axios';
import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import Loadding from '../../Loadding/Loadding';

import Search from '../../Search/Search'

function Categories() {
    const state = useContext(GlobalState);
    const [search, setSearch] = state.CategoryAPI.search
    const [categories] = state.CategoryAPI.categories
    const [token] = state.token

    const [category, setCategory] = useState('');
    const [callback, setCallback] = state.CategoryAPI.callback
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('')

    const createOrUpdateCategory = async (e) => {
        e.preventDefault();
        if (onEdit) {
            try {
                const res = await axios.post(`/category/update/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } catch (error) {
                return alert(error.response.data.msg)
            }
        }
        else {
            try {
                const res = await axios.post('/category/create', { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } catch (error) {
                return alert(error.response.data.msg)
            }
        }
        setOnEdit(false)
        setCallback(!callback)
        setCategory('')
    }
    const deleteCategory = async id => {
        console.log('llll');
        try {
            const res = await axios.delete(`/category/delete/${id}`, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            alert(res.data.msg)
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    const editCategory = (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }
    const handleOnChange = (e) => {
        setSearch(e.target.value.toLowerCase())
    }
    return (
        <div className="categories">
            <Search search={search} handleOnChange={handleOnChange} />
            <form onSubmit={createOrUpdateCategory}>
                <label htmlFor="category">Category:</label>
                <input type="text" name="category" value={category}
                    onChange={e => setCategory(e.target.value)} />
                <button type="submit">{onEdit ? "Update" : "Save"}</button>
            </form>
            <div className='render-categories'>
                {
                    categories.map((category => {
                        return (
                            <div key={category._id}>
                                <div className="category" key={category._id}>
                                    <p>{category.name}</p>
                                    <button onClick={() => editCategory(category._id, category.name)}>edit</button>
                                    <button onClick={() => deleteCategory(category._id)}>delete</button>
                                </div>
                                <hr></hr>
                            </div>
                        )
                    }))
                }
            </div>
            {categories.length === 0 && <Loadding />}
        </div >
    );
}

export default Categories;