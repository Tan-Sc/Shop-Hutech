import React, { useState, useEffect } from 'react';
import axios from 'axios'

const perPage = 10; //x

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [cities, setCities] = useState([])
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        // console.log(token, 'tk');
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });
                    //console.log(res.data.user.role);
                    if (res.data.user.isBlock === true) {
                        window.location.href = '/login'
                        return alert("This account was blocked")
                    }
                    setIsLogged(true);
                    setUser(res.data.user)
                    setAddresses(res.data.user.addresses)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.user.cart);
                } catch (error) {
                    alert(error)
                }
            }
            getUser();
        }
    }, [token, callback])
    const addCart = async (product) => {
        if (!isLogged) {
            window.location.href = '/login';
            return alert('please login to continue');
        };
        if (product.quantity === 0) {
            return alert('this product has been sold out')
        }
        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            // console.log('test');
            setCart([...cart, {
                _id: product._id,
                title: product.title,
                count: 1,
                prices: product.prices,
                images: product.images.url
            }])
            await axios.post('/user/addcart', {
                cart: [...cart,
                {
                    _id: product._id,
                    title: product.title,
                    count: 1,
                    prices: product.prices,
                    images: product.images.url
                }]
            }, { headers: { Authorization: token } })
            return alert("added to cart");
        }
        else {
            const takeCart = cart.find(item => product._id === item._id)
            // console.log(takeCart);
            console.log(takeCart.count, product.quantity);
            if (takeCart.count + 1 > product.quantity) return alert(`Only ${product.quantity} products left in stock`)
            cart.map(item => {
                if (item._id === product._id) {
                    item.count += 1;
                }
                return item;
            })
            // console.log(cart);
            setCart(cart);
            await axios.post('/user/addcart', {
                cart: cart
            }, { headers: { Authorization: token } })
            return alert("added to cart");
            // return alert('This product has been added to cart');
        }
    }
    useEffect(() => {
        const getCity = async () => {
            const res = await axios.get('https://thongtindoanhnghiep.co/api/city');
            setCities(res.data.LtsItem)
        }
        getCity();
    }, [])
    useEffect(() => {
        if (token) {
            const start = (page - 1) * perPage;
            const end = (page * perPage);
            const getHistory = async () => {
                // console.log(isAdmin);
                if (isAdmin) {
                    const res = await axios.get('/checkout', {
                        headers: { Authorization: token }
                    })
                    // console.log(res.data.checkouts);
                    setHistory((res.data.checkouts).slice(start, end))
                }
                else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory((res.data).slice(start, end))
                }
            }
            getHistory();
        }
    }, [token, isAdmin, callback, setHistory, page])
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addresses: [addresses, setAddresses],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback],
        cities: [cities, setCities],
        users: [users, setUsers],
        user: [user, setUser],
        page: [page, setPage],
    }
}

export default UserAPI;