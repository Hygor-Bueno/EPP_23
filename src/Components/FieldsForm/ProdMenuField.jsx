import React from 'react';
import Util from '../../Util/Util';

export default function ProdMenuField(props) {
    const util = new Util();
    return (
        <fieldset className='form-group row'>
            <legend>Adicionar produtos ao menu</legend>
            {props.itemForm("", "Cód.:", "", "Código do pedido.", "number", 4, props.idProdMenu, props.setIdProdMenu, true, null, false)}
            {/*               id,  label, divLength, list,                                                          defaultValue,   funSetValue, funAssistant, mandatory */}
            {props.selectForm("", "Menu:", 8, util.formatJsonForSelect(props.menuList, "idMenu", "description"), props.selectMenu, props.setSelectMenu, false, true)}
            {props.itemForm("", "Cód.:", "Menu", "Informe o código do menu", "number", 4, props.idMenu, props.setIdMenu, false, null, true)}
            {props.itemForm("", "Cód.:", "Arroz", "Informe o código do arroz", "number", 4, props.rice, props.setRice, false, null, true)}
            {props.itemForm("", "Cód.:", "Sobremesa", "Informe o código da sobremesa", "number", 4, props.dessert, props.setDessert, false, null, true)}
        </fieldset>
    )
}
