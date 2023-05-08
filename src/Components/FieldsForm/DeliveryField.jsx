import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DeliveryField(props) {
    return (
        <fieldset className='form-group row'>
            <legend>Dados da entrega</legend>
            {props.itemForm("Data:", "", "Data da entrega.", "date", 3, props.dateDelivery, props.setDateDelivery, false,null,true)}
            {props.itemForm("Hora:", "", "Horário da entrega.", "time", 3, props.hoursDelivery, props.setHoursDelivery, false,null,true)}
            {props.selectForm("Local da Entrega", 6, props.stores, props.localDelivery, props.setLocalDelivery,null,true)}
        </fieldset>
    );
}
