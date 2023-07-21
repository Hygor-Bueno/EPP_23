import React from 'react';
import Util from '../../Util/Util';

export default function ProductField(props) {
    const util = new Util();
    return (
        <fieldset id="fieldProduct" className='form-group row'>
            <legend>Cadastrar produto</legend>
            {/*               id,         label,placInput, titleInput,    typeInput,divLength, value,          funSetValue,   enabled, funAssistant, mandatory */}
            {props.itemForm("productId", "Cód.:", "", "Código do produto.", "number", 4, props.idProduct, props.setIdProduct, false, null, true)}
            {props.itemForm("descriptionProd", "Descrição:", "Nome do produto", "Digite o nome do produto", "text", 8, props.descProduct, props.setDescProduct, false,null,true)}
            {/* {props.itemForm("price", "Preço:", "R$ ", "Digite o valor do produto", "number", 3, props.priceProduct, props.setPriceProduct, false, null, true)} */}
            {/*                  id,         label, divLength, list,                                                                        defaultValue,   funSetValue, funAssistant, mandatory */}
            {props.selectForm("category", "Categoria:", 4, util.formatJsonForSelect(props.categoryList, 'id_category', 'cat_description'), props.category, props.setCategory, null, true)}
            {props.selectForm("measure", "Emb.:", 4, [{id:"Kg", value:"Kg"}, {id:"Un", value:"Un"}], props.measure, props.setMeasure, null, true)}
            {props.selectForm("statusProd", "Status:", 4, [{id:"1", value:"Ativo"}, {id:"0", value:"Inativo"}], props.statusProduct, props.setStatusProduct, null, true)}
            {/*                id,    label, placArea, titleArea,     typeArea,divLength,value,               funSetValue,  enabled, funAssistant, mandatory */}
            {props.areaForm("price", "Informações Consinco:", "", "Informações Consinco", "text", 12, props.priceProduct, props.setPriceProduct, true, null, false)}
        </fieldset>
    )
}