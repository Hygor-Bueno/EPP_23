import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function ClientField(props) {
    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Dados do cliente</legend>
            {props.itemForm("Cód.:", "", "Código do pedido.", "number", 2, props.orderCod || '', props.setOrderCod, true, null, false)}
            {props.itemForm("Cliente:", "Nome do cliente", "Digite o nome do cliente", "text", 6, props.nameClient || '', props.setNameClient, false, null, true)}
            {props.itemForm("Telefone:", "Ex: 99999-9999", "Digite um telefone para contato", "text", 4, props.foneClient, props.setFoneClient, false, null, false)}
            {props.itemForm("E-mail:", "exmp@gmail.com", "Digite o nome do cliente", "text", 4, props.email, props.setEmail, false, null, false)}
            {props.itemForm("Data:", "", "Digite o nome do cliente", "date", 4, props.dateOrder, props.setDateOrder, false, null, true)}
            {statusOrder()}
        </fieldset>
    );

    function statusOrder() {
        return (
            <div className={`col-4 my-1 d-flex flex-column align-items-start `}>
                <label>Status Pedido:</label>
                <div className='d-flex justfy-content-center'>
                    {filterTypeIcon()}
                </div>
            </div>
        );
    }

    function filterTypeIcon() {
        let response = '';
        switch (parseInt(props.deliveredOrder)) {
            case 0:
                response = <FontAwesomeIcon title="Pendente" className="form-control text-warning" icon={'fa-circle-exclamation'} />
                break;
            case 1:
                response = <FontAwesomeIcon title="Entregue" className="form-control text-success" icon={'fa-circle-check'} />
                break;
            case 2:
                response = <FontAwesomeIcon title="Cancelado" className="form-control text-danger" icon={'fa-circle-xmark'} />
                break;
            default:
                console.log("Valor incorreto");
        }
        return response;
    }
}
