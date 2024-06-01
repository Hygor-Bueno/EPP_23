import './App.css';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import Login from '../Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCircleXmark, faUserCircle, faLock, faTrashAlt, faCheckSquare, faRightFromBracket, faCirclePlus, faTruck, faPrint, faChevronLeft, faChevronCircleLeft, faChevronRight, faChevronCircleRight, faBoxesPacking, faMoneyCheckDollar, faComputer, faCircleCheck, faCircleExclamation, faPen, faTrash, faPlus, faEraser, faCopy, faHome, faSave, faUndoAlt, faSquare, faQrcode,faTable,faDownload} from '@fortawesome/free-solid-svg-icons'
import Home from '../Components/Home/Home.jsx';
import Skeleton from '../Components/Skeleton/Skeleton.jsx';
import Order from '../Components/Order/Order';
import Register from '../Components/Registry/Register.jsx';
import Registry from '../Components/Registry/Registry.jsx';

library.add(faSearch, faCircleXmark, faUserCircle, faLock, faTrashAlt, faCheckSquare, faRightFromBracket, faCirclePlus, faTruck, faPrint, faChevronLeft, faChevronCircleLeft, faChevronRight, faChevronCircleRight, faBoxesPacking, faMoneyCheckDollar, faComputer, faCircleCheck, faCircleExclamation, faPen, faTrash, faPlus, faEraser, faCopy, faHome, faSave, faUndoAlt, faSquare, faQrcode,faTable,faDownload)

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={loadPage(<Skeleton ><Home /></Skeleton>)} />
                <Route path="*" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                <Route path="/" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Skeleton><Order /></Skeleton>} />
                <Route path="/registry" element={<Skeleton><Registry /></Skeleton>} />
                <Route path="/Supper" element={<Skeleton><Register /></Skeleton>} />
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
