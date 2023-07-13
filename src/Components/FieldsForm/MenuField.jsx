import React from 'react';

export default function MenuField(props) {
    return (
        <fieldset id="fieldMenu" className='form-group row'>
            <legend>Cadastrar menu</legend>
            {/*             id,        label,placInput, titleInput,  typeInput,divLength,value,     funSetValue,  enabled, funAssistant, mandatory */}
            {props.itemForm("menuId", "Cód.:", "", "Código do menu", "number", 4, props.idMenu, props.setIdMenu, true, null, false)}
            {props.itemForm("descriptionMenu", "Descrição:", "Nome do menu", "Digite o nome do menu", "text", 8, props.descMenu, props.setDescMenu, false, null, true)}
            {/*                 id,      label, divLength, list,                                                       defaultValue,   funSetValue, funAssistant, mandatory */}
            {props.selectForm("status", "Status:", 4, [{ id: "1", value: "Ativo" }, { id: "0", value: "Inativo" }], props.statusMenu, props.setStatusMenu, null, true)}
        </fieldset>
    )
}
