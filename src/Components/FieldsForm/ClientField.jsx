import React from 'react';
import { useEffect } from 'react';

export default function ClientField(props) {
    // useEffect(() => {
    //     console.log( props.orderCod, props.nameClient);
    // }, [props]);
    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Dados do cliente</legend>
            {props.itemForm("Cód.:", "", "Código do pedido.", "number", 2, props.orderCod || '', props.setOrderCod, true,null,false)}
            {props.itemForm("Cliente:", "Nome do cliente", "Digite o nome do cliente", "text", 6, props.nameClient || '', props.setNameClient, false,null,true)} 
            {props.itemForm("Telefone:", "Ex: 99999-9999", "Digite um telefone para contato", "number", 4, props.foneClient, props.setFoneClient, false,null,false)}
            {props.itemForm("E-mail:", "exmp@gmail.com", "Digite o nome do cliente", "text", 4, props.email, props.setEmail, false,null,false)}
            {props.itemForm("Data:", "", "Digite o nome do cliente", "date", 4, props.dateOrder, props.setDateOrder, false,null,true)}
        </fieldset>
    )
}
