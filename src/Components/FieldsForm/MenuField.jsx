import React from 'react';

export default function MenuField(props) {
    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Cadastrar menu</legend>
            {props.itemForm("Cód.:", "", "Código do menu", "number", 2, props.orderCod, props.setOrderCod, true,null,false)}
            {props.itemForm("Descrição:", "Nome do menu", "Digite o nome do menu", "text", 6, props.descMenu, props.setDescMenu, false,null,true)}
            {/*props.selectForm("Status:", 6, props.statusMenu, props.setStatusMenu, false, null, true)*/}
        </fieldset>
    )
}
