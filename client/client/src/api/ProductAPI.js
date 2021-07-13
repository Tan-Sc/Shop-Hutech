import { useState, useEffect } from 'react';
import axios from 'axios'
const perPage = 10; //x
function ProductAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    const [page, setPage] = useState(1)
    const [allproducts, setAllproducts] = useState([])
    const [hotLaptops, setHotLaptop] = useState([]);
    const [hotMouses, setHotMouses] = useState([]);
    const [hotHeadphones, setHotHeadphone] = useState([]);

    useEffect(() => {
        const start = (page - 1) * perPage;
        const end = (page * perPage);
        const getProducts = async () => {
            const res = await axios.get(`/products?${category}&${sort}&title[regex]=${search}`);
            setProducts((res.data.products).slice(start, end))
            setResult(res.data.result)
        }
        getProducts();
    }, [callback, category, search, sort, page, callback])
    useEffect(() => {
        const getAllProducts = async () => {
            const res = await axios.get('/products')
            setAllproducts((res.data.products))
        }
        const getLaptops = async () => {
            const res = await axios.get(`/products?category=laptop&sort=-sold`)
            setHotLaptop(takeProductsHot(res.data.products))
        }
        const getMouses = async () => {
            const res = await axios.get(`/products?category=mouse&sort=-sold`)
            setHotMouses(takeProductsHot(res.data.products))
        }
        const getHeadphone = async () => {
            const res = await axios.get(`/products?category=headphone&sort=-sold`)
            setHotHeadphone(takeProductsHot(res.data.products))
        }
        getLaptops();
        getMouses();
        getHeadphone();
        getAllProducts();
    }, [page, callback])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        result: [result, setResult],
        page: [page, setPage],
        hotLaptops: [hotLaptops, setHotLaptop],
        hotHeadphones: [hotHeadphones, setHotHeadphone],
        hotMouses: [hotMouses, setHotMouses],
        allproducts: [allproducts, setAllproducts]
    }
}
const takeProductsHot = (products) => {
    return products.filter(product => {
        return (product.isDelete === false && product.quantity > 0)
    })
}
export default ProductAPI;