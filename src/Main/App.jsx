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
import Registry from '../Components/Registry/Registry.jsx';
import ThemeContextConnectionProvider from '../Theme/ThemeConnection.jsx';
import Order from '../Components/Order/Order';
import Supper from '../Components/Registry/Supper.jsx';

library.add(faSearch, faCircleXmark, faUserCircle, faLock, faTrashAlt, faCheckSquare, faRightFromBracket, faCirclePlus, faTruck, faPrint, faChevronLeft, faChevronCircleLeft, faChevronRight, faChevronCircleRight, faBoxesPacking, faMoneyCheckDollar, faComputer, faCircleCheck, faCircleExclamation, faPen, faTrash, faPlus, faEraser, faCopy, faHome, faSave, faUndoAlt, faSquare, faQrcode,faTable,faDownload)

export default function App() {
    return (
        <ThemeContextConnectionProvider>
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={loadPage(<Skeleton ><Home /></Skeleton>)} />
                    <Route path="*" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                    <Route path="/" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/order" element={<Skeleton><Order /></Skeleton>} />
                    <Route path="/registry" element={<Skeleton><Registry /></Skeleton>} />
                    <Route path="/Supper" element={<Skeleton><Supper /></Skeleton>} />
                </Routes>
            </HashRouter>
        </ThemeContextConnectionProvider>
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