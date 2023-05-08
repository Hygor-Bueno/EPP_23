import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import './Skeleton.css';

export default function Skeleton({ children }) {
    const [menu, setMenu] = useState(false)

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
                    <button type="button" title="Tela de produção." onClick={() => console.log('Produção')}><FontAwesomeIcon icon="fa-boxes-packing" /></button>
                    <button type="button" title="Tela de vendas." onClick={() => console.log('Vendas')}><FontAwesomeIcon icon="fa-money-check-dollar" /></button>
                    <button type="button" title="Tela de Cadastro (Menu e Produtos)." onClick={() => console.log('Cadastro')}><FontAwesomeIcon icon="fa-computer" /></button>
                </div>
            </aside>
        </div>
    );
}