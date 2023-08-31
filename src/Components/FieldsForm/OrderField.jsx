import React, { useState } from 'react';
import Util from '../../Util/Util';
import LogSales from '../../Class/LogSale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OrderField(props) {
    const util = new Util();
    const [contObs, setContObs] = useState(props.observation.length);
    const limitObs = 250
    return (
        <fieldset id="orderField" className='form-group row border-bottom border-dark'>
            <legend>Dados do pedido</legend>
            {props.itemForm("Cód.:", "", "Código do menu.", "number", 2, props.pluMenu, props.setPluMenu, true)}
            {props.selectForm("Menu", 4, util.formatJsonForSelect(props.menusList, "idMenu", "description"), props.menu, selectMenu)}
            {props.selectForm("Arroz", 3, util.formatJsonForSelect(props.riceList, "idProduct", "description"), props.rice, props.setRice, getPluMenu)}
            {props.selectForm("Sobremesa", 3, util.formatJsonForSelect(props.dessertsList, "idProduct", "description"), props.dessert, props.setDessert, getPluMenu)}
            <div className='col-12'>
                <div className='d-flex justify-content-between'>
                    <label><b>Adicional:</b></label>
                    <button onClick={() => { props.setModAdditional(true); }} type='button' title="Abrir lista de itens adicionais.">
                        <FontAwesomeIcon icon="fa-circle-plus" />
                    </button>
                </div>
                <div id="divAdditionalItems" className='border rounded my-1 p-1'>
                    {
                        props.logSales.map((item, index) => !item.getBase_item() && (
                            <div className="d-flex flex-column" key={index}>
                                <span className='d-flex justify-content-between'>
                                    <div><b>Cód: </b>{item.epp_id_product}</div>
                                </span>
                                <span>
                                    <b>Descrição: </b>{item.getDescription()}. {item.quantity} {item.getMeasure()} (Preço Un/Kg R$ {item.getPrice_base()})
                                </span>
                                <span>
                                    <b>SubTotal: </b>{item.price.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id="txtareaObservation" className={"col-12 my-1"}>
                <label><b>Observações:</b> <i id="limitAlertObs" className="legend legend-alert">({contObs}/250)</i></label>
                <div>
                    <textarea title="Itens adicionais" rows="2" id="txtObservation" value={props.observation} onChange={(event) => {
                        let newElement = event.target;
                        let alert = document.getElementById("limitAlertObs");
                        if (newElement.value.length <= limitObs) {
                            props.setObservation(newElement.value);
                            setContObs(newElement.value.length);
                            alert.classList.contains("text-danger") && alert.classList.remove("text-danger");
                        } else {
                            alert.classList.add("text-danger");
                        }
                    }} className='rounded form form-control textareaDefault'></textarea>
                </div>
            </div>
            {props.itemForm("Sinal:", "", "Sinal dado pelo cliente no ato da compra.", "number", 3, props.signal, validateSignal, false, reloadTotal, true)}
            {props.itemForm("Pendente:", "", "Valor que o cliente precisa pagar.", "text", 3, props.pending.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), props.setPedding, true)}
            {props.itemForm("Total.:", "", "Total do pedido.", "text", 3, props.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), props.setTotal, true)}
        </fieldset>
    )
    function validateSignal(value) {
        if (value >= 0) {
            props.setSignal(value);
        }
    }
    function selectMenu(value) {
        props.setMenu(value);
        riceAndDessertClean();
        console.log(props.logSales.length);
        props.logSales.length > 0 && deleteMenuLog();
        reloadTotal();
        let list = props.logsMenusList;

        let filteredMenu = list.filter((item) => {
            let result = null;
            if (item.menu["idMenu"] === value) result = item;
            return result;
        });
        let filteredRice = filteredMenu.filter((item) => {
            let result = null;
            if (item.logMenu["typeBase"] === "Rice") result = item;
            return result;
        });
        let filteredDessert = filteredMenu.filter((item) => {
            let result = null;
            if (item.logMenu["typeBase"] === "Dessert") result = item;
            return result;
        });

        let riceList = filteredRice.map(item => item.product);
        let dessertList = filteredDessert.map(item => item.product);

        let distinctRice = distinctItems(riceList, "idProduct");
        let distinctDessert = distinctItems(dessertList, "idProduct");

        props.setDessertsList([...distinctDessert]);
        props.setRiceList([...distinctRice]);
    }

    function distinctItems(list, key) {
        let lookup = {};
        let items = list;
        let result = [];
        for (let i = 0; items[i]; i++) {
            let value = items[i][key];
            if (!(value in lookup)) {
                lookup[value] = 1;
                result.push(items[i]);
            }
        }
        return result;
    }
    async function getPluMenu() {
        if (props.menu !== "" && props.rice !== "" && props.dessert !== "") {
            let items = props.logsMenusList.filter(itemMenu => (itemMenu.logMenu.eppIdMenu === props.menu && (itemMenu.logMenu.eppIdProduct === props.rice || itemMenu.logMenu.eppIdProduct === props.dessert)) && itemMenu);
            let plu = equalsItems(items, "pluMenu");
            props.setPluMenu(plu.pluMenu);
            // console.error(plu);
            await addItemLogSale(plu);
            reloadTotal();
        }
    }

    function riceAndDessertClean() {
        props.setRice("");
        props.setDessert("");
        props.setPluMenu("");
    }
    function removeItem(idProduct) {
        let items = props.logSales;
        items.forEach((item, index) => {
            if (idProduct === item.epp_id_product) {
                items.splice(index, 1);
            }
        })
        props.setLogSales([...items]);
    }

    function deleteMenuLog() {
        let items = props.logSales;
        items.forEach(item => {
            if (parseInt(item.menu) === 1) {
                removeItem(item.epp_id_product);
            }
        });
    }
    function equalsItems(list, key) {
        let lookup = {};
        let items = list;
        let result = {};
        for (let i = 0; items[i]; i++) {
            let value = items[i]["logMenu"][key];
            let validation = (value in lookup);
            if (!validation) {
                lookup[value] = 1;
            } else {
                result = items[i]["logMenu"];
                result.description = items[i]["menu"]["description"];
            }
        }
        return result;
    };

    async function addItemLogSale(item) {
        try {
            const list = props.logSales;
            const validate = list.filter(elem => elem.epp_id_product === item.pluMenu).length;
            if (validate === 0) {
                let log = new LogSales(null, item.pluMenu, null, 1, null, 1, item.description, 'Un', true);
                let req = await log.addItem();
                if (req.error) throw new Error(req.message);
                let exist = existItem(list);
                if (exist.exist) {
                    list[exist.position] = log;
                } else {
                    list.push(log);
                }
                props.setLogSales([...list]);
            }
        } catch (error) {
            props.setIsOpenModal(true);
            props.setParamsModal({
                type: "Error",
                message: error.toString(),
                title: "Erro!",
                isConfirmation: false,
                onConfirm: ""
            });
            props.cleanOrder();
        }
    }

    function existItem(array) {
        let result = { exist: false, position: 0 }
        array.forEach((item, index) => {
            if (item.getBase_item()) {
                result.exist = true;
                result.position = index;
            }
        })
        return result;
    }

    function reloadTotal() {
        console.log(props.logSales);
        let items = props.logSales;
        let relTotal = 0.0;
        items.forEach(lSale => {
            relTotal += parseFloat(lSale.price);
        });
        props.setPedding(relTotal - props.signal);
        props.setTotal(relTotal);
    }
}