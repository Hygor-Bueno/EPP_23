import React from 'react';

export default function ProductField(props) {
    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Cadastrar produto</legend>
            {props.itemForm("Cód.:", "", "Código do pedido.", "number", 2, props.orderCod, props.setOrderCod, false,null,true)}
            {props.itemForm("Descrição:", "Nome do produto", "Digite o nome do produto", "text", 6, props.nameProduct, props.setNameProduct, false,null,true)}
            {props.itemForm("Preço:", "R$ ", "Digite o valor do produto", "number", 4, props.valProduct, props.setValProduct, false,null,true)}
            {props.selectForm("Categoria:", 6, props.category, props.setCategory, false, null, true)}
            {props.selectForm("Embalagem:", 6, props.pack, props.setPack, false, null,true)}
            {props.selectForm("Status:", 6, props.status, props.setStatus, false, null,true)}
        </fieldset>
    )
}
