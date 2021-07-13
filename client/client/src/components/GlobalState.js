import React, { createContext, useEffect, useState } from 'react'
import CategoryAPI from '../api/CategoryAPI'
import ProductAPI from '../api/ProductAPI'
import UserAPI from '../api/UserAPI'
import axios from 'axios'

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    // const refreshToken = async () => {
    //     const res = await axios.get('/user/refresh_token')
    //     setToken(res.data.accesstoken);
    // }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken);
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken();
        }
    }, [])
    const state = {
        token: [token, setToken],
        UserAPI: UserAPI(token),
        ProductAPI: ProductAPI(),
        CategoryAPI: CategoryAPI()
    }
    //console.log(state, "globalState");
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}