import React from 'react';
export default function Additional(props) {
    return (
        <div className="d-flex flex-column" key={props.index}>
            <span className='d-flex justify-content-between'>
                <div><b>Cód: </b>{props.item.epp_id_product}</div>
            </span>
            <span>
                <b>Descrição: </b>{props.item.getDescription()}. {props.item.quantity} {props.item.getMeasure()} (Preço Un/Kg R$ {props.item.getPrice_base()})
            </span>
            <span>
                <b>SubTotal: </b>{props.item.price.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
            </span>
        </div>
    )
}