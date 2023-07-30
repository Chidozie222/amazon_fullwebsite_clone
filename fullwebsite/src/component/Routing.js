import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Home from './home/home';
import List from './list/listLogic';
import Detail from './Detail/detaillogic';
import PlaceOrder from './order/placeorder';
import ViewOrder from './order/vieworder';
import Login from './login/login';
import SignUp from './login/signup';
const Routing = () =>{
    return(
        <div>
            <BrowserRouter>
                 <Header/>
                 <Routes>
                    <Route path='/' element={<Main/>}/>
                        <Route index element={<Home/>}/>
                        <Route path='home' element={<Home/>}/>
                        <Route path="list/:category_id" element={<List/>}/>
                        <Route path="Detail/:id" element={<Detail/>}/>
                        <Route path="placeOrder/:category" element={<PlaceOrder/>}/>
                        <Route path="viewOrder" element={<ViewOrder/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                 </Routes>
                 <Footer/>
            </BrowserRouter>
        </div>
    )

}










export default Routing