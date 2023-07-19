import React from 'react';
import Util from '../../Util/Util';

export default function ProdMenuField(props) {
    const util = new Util();
    return (
        <fieldset className='form-group row'>
            <legend>Adicionar produtos ao menu</legend>
            {props.itemForm("", "Cód.:", "", "Código da adição", "number", 4, props.idProdMenu, props.setIdProdMenu, true, null, false)}
            {/*               id,  label, divLength, list,                                                          defaultValue,   funSetValue, funAssistant, mandatory */}
            {props.selectForm("", "Menu:", 8, util.formatJsonForSelect(props.menuList, "idMenu", "description"), props.idMenu, props.setIdMenu, false, true)}
            {props.itemForm("", "Menu", "Código", "Informe o código do menu", "number", 4, props.idSale, props.setIdSale, false, null, true)}
            {props.itemForm("", "Arroz", "Código", "Informe o código do arroz", "number", 4, props.rice, props.setRice, false, null, true)}
            {props.itemForm("", "Sobremesa", "Código", "Informe o código da sobremesa", "number", 4, props.dessert, props.setDessert, false, null, true)}
        </fieldset>
    )
}
