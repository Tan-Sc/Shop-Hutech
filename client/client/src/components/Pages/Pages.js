import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './Auth/Login'
import Register from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'

import Home from './Home/Home'
import Users from '../Admin/AdminUsers/AdminUser'
import CreateAddress from './CreateAddress/CreateAddress'
import CreateProduct from './Admin/CreateProduct/CreateProduct'

import Products from './Products/Products'
import About from './About/About'
import Contact from './Contact/Contact'
import Cart from './Cart/Cart'
import NotFoundPage from './NotFound/NotFound'
import DetailProduct from './DetailProduct/DetailProduct'
import TransitionHistory from './TransitionHistory/TransitionHisory'
import ViewDetailOrder from './TransitionHistory/ViewDetailOrder'

import Categories from './Categories/Categories'

import { GlobalState } from '../GlobalState'
import Checkout from './Cart/Checkout';
import Dasboard from '../AdminDasboard/Dasboard';
import Bill from '../Pages/Bill/Bill'
import ProductCategory from '../Pages/ProductCategory/ProductCategory'
import ChangePassword from '../Pages/ChangePassword/ChangePassword'

function Pages() {

    const styleObject = {
        display: 'flex'
    }

    const state = useContext(GlobalState);
    const [isLogged] = state.UserAPI.isLogged;
    const [isAdmin] = state.UserAPI.isAdmin;
    const [user] = state.UserAPI.user
    const token = state.token
    const [categories] = state.CategoryAPI.categories;


    // const notLogin = (isLogged) => {
    //     setTimeout(() => {
    //         if (!isLogged) {
    //             if (window.confirm('Bạn phải đăng nhập để tiếp tục'))
    //                 window.location.href = '/login'
    //             else window.location.href = '/'
    //         };
    //     }, 3000);
    // }
    return (
        <Switch>
            <Route path='/' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <Home />}
            </Route>
            <Route path='/home' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <Home />}
            </Route>
            <Route path='/dasboard' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Home /></div> : <NotFoundPage />}
            </Route>
            <Route path='/admin/users' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Users /></div> : <NotFoundPage />}
            </Route>
            <Route path='/bill/:id' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Bill /></div> : <NotFoundPage />}
            </Route>
            <Route path='/products' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Products /></div> : <Products />}
            </Route>
            <Route path='/products/create' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><CreateProduct categories={categories} token={token} /></div>
                    : <NotFoundPage />}
            </Route>
            <Route path='/products/create/:id' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><CreateProduct categories={categories} token={token} /></div>
                    : <NotFoundPage />}
            </Route>
            <Route path='/history' exact>
                {
                    isAdmin ? <div className='item' style={styleObject}><Dasboard /><TransitionHistory /></div> : (isLogged ? <TransitionHistory /> : <Login />)
                }
            </Route>
            <Route path='/category' exact>
                {isAdmin ? <div className='item' style={styleObject}><Dasboard /><Categories /></div> : <NotFoundPage />}
            </Route>
            <Route path='/history/:id' exact>
                <ViewDetailOrder />
            </Route>
            <Route path='/address' exact>
                {isAdmin || !isLogged ? <NotFoundPage /> : <CreateAddress />}
            </Route>
            <Route path='/changepassword' exact>
                {isAdmin || !isLogged ? <NotFoundPage /> : <ChangePassword user={user} />}
            </Route>
            <Route path='/products/detail/:id' exact>
                {!isAdmin ? <DetailProduct /> : <NotFoundPage />}
            </Route>
            <Route path='/products/category/:id' exact>
                {!isAdmin ? <ProductCategory /> : <NotFoundPage />}
            </Route>
            <Route path='/about' exact>
                {!isAdmin ? <About /> : <NotFoundPage />}
            </Route>
            <Route path='/contact' exact>
                {!isAdmin ? <Contact /> : <NotFoundPage />}
            </Route>
            <Route path='/login' exact>
                {/* {isLogged ?
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    : <Login />} */}
                <Login />
            </Route>
            <Route path='/register'>
                {!isAdmin ? <Register /> : <NotFoundPage />}
            </Route>
            <Route path='/forgot_password'>
                {!isLogged ? <ForgotPassword /> : <NotFoundPage />}
            </Route>
            <Route path='/user/reset/:id'>
                {!isLogged ? <ResetPassword /> : <NotFoundPage />}
            </Route>
            <Route path='/cart' exact>
                {!isAdmin ? (isLogged ? <Cart /> : <Login />) : <NotFoundPage />}
            </Route>
            <Route path='/checkout' exact>
                <Checkout />
            </Route>
            <Route path='*'>
                <NotFoundPage />
            </Route>
        </Switch>
    );
}
export default Pages;