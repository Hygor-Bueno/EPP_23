import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import Util from '../../Util/Util';
import './Skeleton.css';
import {  useNavigate } from 'react-router-dom';

export default function Skeleton({ children }) {
    const [menu, setMenu] = useState(false);
    const [publicUser, setPublicUser] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const util = new Util();
                let validation = await util.validateAccess();
                if (validation.error) throw new Error(validation.message);
                setPublicUser(validation.data[0].public_user);
            } catch (e) {
                console.error(e)
            }
        })();
    }, [])
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
                    <button type="button" className={publicUser ? 'disabledStyle' : ''} disabled={publicUser} title="Tela de produção." onClick={() => navigate("/order")}><FontAwesomeIcon icon="fa-boxes-packing" /></button>
                    <button type="button" title="Tela de vendas." onClick={() => navigate("/")}><FontAwesomeIcon icon="fa-money-check-dollar" /></button>
                    <button type="button" className={publicUser ? 'disabledStyle' : ''} disabled={publicUser} title="Tela de Cadastro (Menu e Produtos)." onClick={() => navigate("/registry")}><FontAwesomeIcon icon="fa-computer" /></button>
                    <button type="button" title="Realizar logoff." onClick={() => {
                        navigate("/login");
                        localStorage.removeItem('token');
                        localStorage.removeItem('num_store');
                        localStorage.removeItem('id');
                        localStorage.removeItem('store');
                    }}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>
                </div>
            </aside>
        </div>
    );
}