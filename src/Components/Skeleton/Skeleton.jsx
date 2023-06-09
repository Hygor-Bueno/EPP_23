import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import './Skeleton.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Skeleton({ children }) {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate();
    return (
        <div id="skeleton">
            <section>
                {children}
            </section>
            <aside>
                <div id="divButtonMenu">
                    {menu ?
                        <button type="button" title="Fechar Menu" onClick={() => setMenu(!menu)}><FontAwesomeIcon icon="fa-chevron-circle-right" /></button>
                        :
                        <button type="button" title="Abrir Menu" onClick={() => setMenu(!menu)}><FontAwesomeIcon icon="fa-chevron-circle-left" /></button>
                    }
                </div>
                <div id="verticalMenuDiv" className={menu ? 'd-flex' : "d-none"}>
                    <button type="button" title="Tela de produção." onClick={() => navigate("/order")}><FontAwesomeIcon icon="fa-boxes-packing" /></button>
                    <button type="button" title="Tela de vendas." onClick={() => navigate("/")}><FontAwesomeIcon icon="fa-money-check-dollar" /></button>
                    <button type="button" title="Tela de Cadastro (Menu e Produtos)." onClick={() => navigate("/product")}><FontAwesomeIcon icon="fa-computer" /></button>
                    <button type="button" title="Realizar logoff." onClick={() => {
                        navigate("/login");
                        localStorage.removeItem('token');
                    }}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>
                </div>
            </aside>
        </div>
    );
}