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
export default function OrderForm() {
    const toDay = new Util().dateCurrent();

    const { updateListOrder } = useOrderContext();

    //Área dos Inpust:
    const productCode = new SettingInputsField({ label: "Cód. produto:", value: "", type: "text" });
    productCode.classContainer = 'col-6';

    const orderNumber = new SettingInputsField({ label: "Nº do pedido:", value: "", type: "number" });
    orderNumber.classContainer = 'col-6';

    const dateInit = new SettingInputsField({ label: "Data inicial:", value: toDay, type: "date" });
    dateInit.classInput='form-control';
    const dateFinal = new SettingInputsField({ label: "Data final:", value: toDay, type: "date" });
    dateFinal.classInput='form-control';


    const hourInit = new SettingInputsField({ label: "Hora inicial:", value: "", type: "time" });
    hourInit.classContainer = 'col-6';
    hourInit.classInput='form-control';
    const hourFinal = new SettingInputsField({ label: "Hora final:", value: "", type: "time" });
    hourFinal.classContainer = 'col-6';
    hourFinal.classInput='form-control';

    //Área dos Selects:
    const [stores, setStores] = useState(new SettingSelectField({ selectValue: '', label: '', options: [{ code: '', name: '' }] }));
    const dateType = new SettingSelectField({ selectValue: '', label: 'Ref. Data:', options: [{ code: 'Pedido', name: 'Pedido' }, { code: 'Entrega', name: 'Entrega' }] });
    const orderStatus = new SettingSelectField({ selectValue: '', label: 'Status:', options: [{ code: '0', name: 'Pendentes' }, { code: '1', name: 'Entregues' }, { code: '1', name: 'Cancelados' }] });

    //Área dos botões:
    const buttonGet = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-success col-2', buttonIcon: 'fa-search', buttonClick: () => console.log("Buscando os valores...") })
    const buttonClean = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-danger col-2', buttonIcon: 'fa-trash-alt', buttonClick: () =>{ console.log("Limpar valores do formulário..."); }})
    const buttonQrCode = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-qrcode', buttonClick: () => console.log("Gerando QrCodes...") })
    const buttonTable = new SettingButtons({ buttonType: 'button', buttonTitle: 'Buscar', buttonClass: 'btn btn-primary col-2', buttonIcon: 'fa-table', buttonClick: () => console.log("Baixar planilha...") })

    useEffect(() => {
        async function loadStores() {
            let connection = new Connection();
            let reqStore = await connection.get('&company_id=1', 'CCPP/Shop.php');
            if (!reqStore.error) {
                let listStore = [];
                reqStore.data.forEach(store => listStore.push({ code: `${store.description.replace(/ /g, '-')}_${store.number}`, name: store.description }));
                let newTeste = new SettingSelectField({selectValue: '', label: 'Lojas', options: listStore});
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
        </div>
    );
}