import './App.css';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import Login from '../Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCircleXmark, faUserCircle, faLock, faTrashAlt, faCheckSquare, faRightFromBracket, faCirclePlus, faTruck, faPrint, faChevronLeft, faChevronCircleLeft, faChevronRight, faChevronCircleRight, faBoxesPacking, faMoneyCheckDollar, faComputer, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import Home from '../Components/Home/Home';
import Skeleton from '../Components/Skeleton/Skeleton';
import Product from '../Components/Product/Product';
import Order from '../Components/Order/Order';

library.add(faSearch, faCircleXmark, faUserCircle, faLock, faTrashAlt, faCheckSquare, faRightFromBracket, faCirclePlus, faTruck, faPrint, faChevronLeft, faChevronCircleLeft, faChevronRight, faChevronCircleRight, faBoxesPacking, faMoneyCheckDollar, faComputer, faCircleCheck, faCircleExclamation)

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={loadPage(<Skeleton ><Home /></Skeleton>)} />
                <Route path="*" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                <Route path="/" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={loadPage(<Skeleton><Order /></Skeleton>)} />
                <Route path="/product" element={loadPage(<Skeleton><Product /></Skeleton>)} />
            </Routes>
        </HashRouter>
    )
    function loadPage(page) {
        return (
            <PrivateRoute>
                <div className='app'>
                    {page}
                </div>
            </PrivateRoute>
        )
    }
}