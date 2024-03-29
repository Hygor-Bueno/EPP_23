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
    const { listOrder, updateListOrder, restartListOrder, setLoading, setParamsModal, setIsOpenModal } = useOrderContext();
    const [printQrcode, setPrintQrcode] = useState(false);

    //Área dos Inpust:
    const productCode = new SettingInputsField({ label: "Cód. produto:", type: "text" });
    productCode.classContainer = 'col-6';

    const orderNumber = new SettingInputsField({ label: "Nº do pedido:", type: "number" });
    orderNumber.classContainer = 'col-6';

    const dateInit = new SettingInputsField({ label: "Data inicial:", type: "date" });
    dateInit.classInput = 'form-control';
    const dateFinal = new SettingInputsField({ label: "Data final:", type: "date" });
    dateFinal.classInput = 'form-control';

    const hourInit = new SettingInputsField({ label: "Hora inicial:", type: "time" });
    hourInit.classContainer = 'col-6';
    hourInit.classInput = 'form-control';
    const hourFinal = new SettingInputsField({ label: "Hora final:", type: "time" });
    hourFinal.classContainer = 'col-6';
    hourFinal.classInput = 'form-control';

    //Área dos Selects:
    const [stores, setStores] = useState(new SettingSelectField({ label: '', options: [{ code: '', name: '' }] }));
    const dateType = new SettingSelectField({ label: 'Ref. Data:', options: [{ code: 'Pedido', name: 'Pedido' }, { code: 'Entrega', name: 'Entrega' }] });
    const orderStatus = new SettingSelectField({ label: 'Status:', options: [{ code: '0', name: 'Pendentes' }, { code: '1', name: 'Entregues' }, { code: '2', name: 'Cancelados' }] });

    //Área dos botões:
    const buttonGet = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-success col-2', buttonIcon: 'fa-search', buttonClick: () => queryForm() })
    const buttonClean = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-danger col-2', buttonIcon: 'fa-trash-alt', buttonClick: async () => { cleanForm(); await restartListOrder(); } })
    const buttonQrCode = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-qrcode', buttonClick: () => setPrintQrcode(true) })
    const buttonTable = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-table', buttonClick: () => { util.downloadtable(listOrder,'Pedidos','quantity') } })

    useEffect(() => {
        async function loadStores() {
            setLoading(true);
            let connection = new Connection();
            let reqStore = await connection.get('&company_id=1', 'CCPP/Shop.php');
            if (!reqStore.error) {
                let listStore = [];
                reqStore.data.forEach(store => listStore.push({ code: `${store.description.replace(/ /g, '-')}_${store.number}`, name: store.description }));
                let newTeste = new SettingSelectField({ label: 'Lojas', options: listStore });
                setStores(newTeste);
            } else {
                setIsOpenModal(true);
                setParamsModal({
                    type: "Error",
                    message: 'Erro ao carregar a loja, por favor recarregar a página!',
                    title: "Erro!",
                    isConfirmation: false,
                    onConfirm: ""
                });
            };
            setLoading(false);
        }
        loadStores();
    }, [setLoading, setParamsModal, setIsOpenModal]);

    return (
        <div id='containerFormCtrl' className="container w-25">
            <form id='formOrderCtrl'>
                <fieldset className="row">
                    <legend>Pedidos</legend>
                    <InputsField object={productCode} />
                    <InputsField object={orderNumber} />
                    <SelectField select={stores} />
                    <SelectField select={orderStatus} />
                </fieldset>
                <fieldset className="row">
                    <legend>Datas</legend>
                    <InputsField object={dateInit} />
                    <InputsField object={dateFinal} />
                    <SelectField select={dateType} />
                </fieldset>
                <fieldset className="row">
                    <legend>Horários</legend>
                    <InputsField object={hourInit} />
                    <InputsField object={hourFinal} />
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
        setLoading(true);
        try {
            let testFields = multipleValidation();
            if (testFields.error) throw new Error(testFields.message || 'Compos irrgulares...');
            let connection = new Connection();
            let req = await connection.get(prepareURL(), "EPP/LogSale.php");
            if (req.error) throw new Error(req.message);
            updateListOrder(req.data);
            cleanForm();
        } catch (error) {
            setIsOpenModal(true);
            setParamsModal({
                type: "Error",
                message: error.toString(),
                title: "Erro!",
                isConfirmation: false,
                onConfirm: ""
            });
        }
        setLoading(false)
    }
    function prepareURL() {
        let response = "&controllerEPP";
        if (productCode.value) {
            response += `&epp_id_product=${productCode.value}`;
        }
        if (orderNumber.value) {
            response += `&epp_id_order=${orderNumber.value}`;
        }
        if (stores.selectValue) {
            let select = stores.selectValue;
            response += `&delivery_store=${select}`;
        }
        if (dateType.selectValue) {
            response += `&${dateType.selectValue === "Pedido" ? "&date_order" : "&delivery_date"}='${dateInit.value}'_'${dateFinal.value}'`;
        }
        if (hourInit.value) {
            response += `&delivery_hour='${hourInit.value}'_'${hourFinal.value}'`;
        }
        if (orderStatus.selectValue) {
            let select = orderStatus.selectValue;
            response += `&delivered=${select}`;
        }
        return response;
    }
    async function cleanForm() {
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
        dateType.selectValue = '';
        orderStatus.selectValue = '';
        stores.selectValue = '';
        setStores(new SettingSelectField({ ...stores }))
    }
    function cleanElement() {
        let listInput = document.querySelectorAll('#containerFormCtrl input');
        let listSelects = document.querySelectorAll('#containerFormCtrl select');
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
    function multipleValidation() {
        let result = { error: false, message: '' }
        let validations = [
            allNullFields(),
            dateValidation(),
            timeValidation()
        ];
        validations.forEach(validate => {
            if (validate.error) {
                result.error = true;
                result.message += validate.message;
            }
        })
        return result;
    }
    function allNullFields() {
        let result = { error: true, message: 'Atenção! para realizar a busca será necessário preencher ao menos um dos campos.\n' };
        let allFields = [
            productCode.value,
            orderNumber.value,
            dateInit.value,
            dateFinal.value,
            dateType.selectValue,
            hourInit.value,
            hourFinal.value,
            orderStatus.selectValue,
            stores.selectValue
        ];
        allFields.forEach(field => {
            if (field) {
                result = { error: false };
            }
        });
        return result;
    }

    function dateValidation() {
        let result = { error: false, message: '' };
        if (dateType.selectValue && (!dateInit.value || !dateFinal.value)) {
            result.error = true;
            result.message += 'Ao selecionar o tipo de data, se torna obrigatória a seleção da data inicial e data final.\n';
        }
        if ((!dateInit.value && dateFinal.value) || (dateInit.value && !dateFinal.value)) {
            result.error = true;
            result.message += 'Ao selecionar uma data, ambas se tornam obrigatórias.\n';
        }
        return result;
    }
    function timeValidation() {
        let result = { error: false };
        if ((!hourInit.value && hourFinal.value) || (hourInit.value && !hourFinal.value)) {
            result.error = true;
            result.message = 'Ao selecionar um dos campos de horário, ambos se tornam obrigatórios.\n';
        }
        return result;
    }
}