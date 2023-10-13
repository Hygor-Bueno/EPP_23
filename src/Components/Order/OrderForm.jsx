import React, { useEffect, useState } from "react";
import SettingInputsField from "../Forms/Inputs/SettingInputsField.ts";
import InputsField from "../Forms/Inputs/InputsField.tsx";
import Util from "../../Util/Util.js";
import SelectField from "../Forms/Selects/SelectField.tsx";
import SettingSelectField from "../Forms/Selects/SettingSelectField.ts";
import { Connection } from "../../Util/RestApi.js";
import Buttons from "../Buttons/Buttons";
import SettingButtons from "../Buttons/SettingButtons.ts";
import { useOrderContext } from "./OrderContext.jsx";
import OrderList from "../QrCode/GenerateQRCodes.jsx";
export default function OrderForm() {
    const util = new Util();
    const toDay = util.dateCurrent();
    const { listOrder, updateListOrder } = useOrderContext();
    const [printQrcode, setPrintQrcode] = useState(false);
    const [changeForm, setChangeForm] = useState(false);

    //Área dos Inpust:
    const productCode = new SettingInputsField({ label: "Cód. produto:", value: "", type: "text" });
    productCode.classContainer = 'col-6';

    const orderNumber = new SettingInputsField({ label: "Nº do pedido:", value: "", type: "number" });
    orderNumber.classContainer = 'col-6';

    const dateInit = new SettingInputsField({ label: "Data inicial:", value: toDay, type: "date" });
    dateInit.classInput = 'form-control';
    const dateFinal = new SettingInputsField({ label: "Data final:", value: toDay, type: "date" });
    dateFinal.classInput = 'form-control';

    const hourInit = new SettingInputsField({ label: "Hora inicial:", value: "", type: "time" });
    hourInit.classContainer = 'col-6';
    hourInit.classInput = 'form-control';
    const hourFinal = new SettingInputsField({ label: "Hora final:", value: "", type: "time" });
    hourFinal.classContainer = 'col-6';
    hourFinal.classInput = 'form-control';

    //Área dos Selects:
    const [stores, setStores] = useState(new SettingSelectField({ selectValue: '', label: '', options: [{ code: '', name: '' }] }));
    const dateType = new SettingSelectField({ selectValue: '', label: 'Ref. Data:', options: [{ code: 'Pedido', name: 'Pedido' }, { code: 'Entrega', name: 'Entrega' }] });
    const orderStatus = new SettingSelectField({ selectValue: '', label: 'Status:', options: [{ code: '0', name: 'Pendentes' }, { code: '1', name: 'Entregues' }, { code: '2', name: 'Cancelados' }] });

    //Área dos botões:
    const buttonGet = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-success col-2', buttonIcon: 'fa-search', buttonClick: () => queryForm() })
    const buttonClean = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-danger col-2', buttonIcon: 'fa-trash-alt', buttonClick: () => { cleanForm(); } })
    const buttonQrCode = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-qrcode', buttonClick: () => setPrintQrcode(true) })
    const buttonTable = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-table', buttonClick: () => { util.downloadtable(listOrder) } })

    useEffect(() => {
        async function loadStores() {
            let connection = new Connection();
            let reqStore = await connection.get('&company_id=1', 'CCPP/Shop.php');
            if (!reqStore.error) {
                let listStore = [];
                reqStore.data.forEach(store => listStore.push({ code: `${store.description.replace(/ /g, '-')}_${store.number}`, name: store.description }));
                let newTeste = new SettingSelectField({ selectValue: '', label: 'Lojas', options: listStore });
                setStores(newTeste);
            };
        }
        loadStores();
    }, []);


    return (
        <div id='containerFormCtrl' className="container w-25">
            <form id='formOrderCtrl'>
                <fieldset className="row">
                    <legend>Pedidos</legend>
                    <InputsField changeForm={changeForm} object={productCode} />
                    <InputsField changeForm={changeForm} object={orderNumber} />
                    <SelectField changeForm={changeForm} select={stores} />
                    <SelectField changeForm={changeForm} select={orderStatus} />
                </fieldset>
                <fieldset className="row">
                    <legend>Datas</legend>
                    <InputsField changeForm={changeForm} object={dateInit} />
                    <InputsField changeForm={changeForm} object={dateFinal} />
                    <SelectField changeForm={changeForm} select={dateType} />
                </fieldset>
                <fieldset className="row">
                    <legend>Horários</legend>
                    <InputsField changeForm={changeForm} object={hourInit} />
                    <InputsField changeForm={changeForm} object={hourFinal} />
                </fieldset>
                <fieldset className="row my-2">
                    <div className="d-flex justify-content-between">
                        <Buttons {...buttonGet} />
                        <Buttons {...buttonClean} />
                        <Buttons {...buttonQrCode} />
                        <Buttons {...buttonTable} />
                    </div>
                </fieldset>
            </form>
            <div>
                <OrderList setPrintQrcode={setPrintQrcode} printQrcode={printQrcode} orders={listOrder} />
            </div>
        </div>
    );

    async function queryForm() {
        try {
            let connection = new Connection();
            let req = await connection.get(prepareURL(), "EPP/LogSale.php");
            if (req.error) throw new Error(req.message);
            updateListOrder(req.data);
            cleanForm();
        } catch (error) {
            console.error(error);
        }
    }
    function prepareURL() {
        let response = "&controllerEPP";
        if (productCode.value !== "") {
            response += `&epp_id_product=${productCode.value}`;
        }
        if (orderNumber.value !== "") {
            response += `&epp_id_order=${orderNumber.value}`;
        }
        if (stores.selectValue !== '') {
            let select = stores.selectValue;
            response += `&delivery_store=${select}`;
        }
        if (dateType.selectValue !== '') {
            response += `&${dateType.selectValue === "Pedido" ? "&date_order" : "&delivery_date"}='${dateInit.value}'_'${dateFinal.value}'`;
        }
        if (hourInit.value !== "") {
            response += `&delivery_hour='${hourInit.value}'_'${hourFinal.value}'`;
        }
        if (orderStatus.selectValue !== "") {
            let select = orderStatus.selectValue;
            response += `&delivered=${select}`;
        }
        return response;
    }
    function cleanForm() {
        cleanVaribles();
        cleanElement();
    };
    function cleanVaribles() {
        productCode.value = '';
        orderNumber.value = '';
        dateInit.value = '';
        dateFinal.value = '';
        hourInit.value = '';
        hourFinal.value = '';
        dateType.value = '';
        orderStatus.value = '';
        dateType.selectValue = '';
        orderStatus.selectValue = '';
        stores.selectValue = '';
        setStores(new SettingSelectField({...stores}))
        setChangeForm(true);
        setChangeForm(false);
    }
    function cleanElement() {
        let listInput = document.querySelectorAll('input');
        let listSelects = document.querySelectorAll('select');
        let listFixedRow = document.querySelectorAll('.fixedTableRow');

        listInput.forEach(element => {
            element.value = '';
        });
        listSelects.forEach(element => {
            element.value = '';
        });
        listFixedRow.forEach(element => {
            element.classList.remove('fixedTableRow');
        });
    }
}