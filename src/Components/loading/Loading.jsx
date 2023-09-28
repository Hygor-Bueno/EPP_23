import React from 'react';
import './Loading.css';

export default function Loading(props={isOpen:false}){
    return props.isOpen && (
        <div id="loadingModal">
            <div className="loader"></div>
            <i className="text-light">Carregando...</i>
        </div>
    );
}