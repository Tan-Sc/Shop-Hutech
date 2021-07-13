import axios from 'axios';
import { useState, useEffect } from 'react';

function CategoryAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false);
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`/category?&name[regex]=${search}`);
            setCategories(res.data.categories)
            setResult(res.data.result)
        }
        getCategories();
    }, [callback, search, sort])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        result: [result, setResult]
    }
}

export default CategoryAPI;