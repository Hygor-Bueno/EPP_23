import React from 'react';

export default function ProductMenuField(props) {
    return (
        <fieldset className='form-group row'>
            <legend>Adicionar produtos ao menu</legend>
            {props.itemForm("Cód.:", "", "Código do pedido.", "number", 2, props.orderCod, props.setOrderCod, true, null, false)}
            {props.itemForm("Cód. menu:", "", "Informe o código do menu", "number", 6, props.menuCod, props.setMenuCod, false, null, true)}
            {props.itemForm("Cód. arroz:", " ", "Informe o código do arroz", "number", 4, props.arrozCod, props.setArrozCod, false, null, true)}
            {props.itemForm("Cód. sobremesa:", "", "Informe o código da sobremesa", "number", 4, props.dessertCod, props.setDessertCod, false, null, true)}
            {props.selectForm("Menu:", 6, props.menuSelect, props.setMenuSelect, false, null, true)}
        </fieldset>
    )
}
