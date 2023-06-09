// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import ClientField from '../FieldsForm/ClientField';
import DeliveryField from '../FieldsForm/DeliveryField';
import OrderField from '../FieldsForm/OrderField';
import './Home.css'
import AddItems from '../AddItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Order } from '../../Class/Order';
import OrderCardList from '../OrderCardList';
import LogSales from '../../Class/LogSale';

export default function Home() {
    const util = new Util();
    const connection = new Connection();
    const [menusList, setMenusList] = useState([]);
    const [riceList, setRiceList] = useState([]);
    const [dessertsList, setDessertsList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [logsMenusList, setLogsMenusList] = useState([]);


    //Valores selecionados no formulário:
    const [orderCod, setOrderCod] = useState("");
    const [nameClient, setNameClient] = useState("");
    const [foneClient, setFoneClient] = useState("");
    const [email, setEmail] = useState("");
    const [dateOrder, setDateOrder] = useState(util.dateCurrent());
    const [observation, setObservation] = useState("");
    const [signal, setSignal] = useState("");
    const [total, setTotal] = useState("");
    const [pending, setPedding] = useState('');


    const [dateDelivery, setDateDelivery] = useState("");
    const [hoursDelivery, setHoursDelivery] = useState("");
    const [localDelivery, setLocalDelivery] = useState("");

    const [pluMenu, setPluMenu] = useState("");
    const [menu, setMenu] = useState("");
    const [rice, setRice] = useState("");
    const [dessert, setDessert] = useState("");

    const [logSales, setLogSales] = useState([]);
    const [modAdditional, setModAdditional] = useState(false);

    useEffect(() => {
        async function loadInit() {
            try {
                // let loja = "Santo Andre";
                // console.log(loja.replace(/ /g, "-"));
                // `&deliveryStore=${'Interlagos_1'}`
                let orderList = loadsFast("", 'EPP/Order.php');
                let storeLists = loadsFast('&company_id=1', 'CCPP/Shop.php');
                let menuList = loadsFast(null, 'EPP/Menu.php');
                let logMenu = loadsFast(null, 'EPP/LogMenu.php');
                await Promise.all([storeLists, menuList, orderList, logMenu]).then(value => {
                    if (value[0].error) throw new Error(value[0].message);
                    if (value[1].error) throw new Error(value[1].message);
                    if (value[2].error && !value[2].message.toUpperCase().includes('NO DATA')) throw new Error(value[2].message);
                    setStoreList(sortArrayStores(value[0].data));
                    value[1].data.unshift({ idMenu: "", description: "Avulso", status: "1" })
                    setMenusList(value[1].data);
                    setOrdersList(value[2].data)
                    setLogsMenusList(value[3].data);
                });
            } catch (err) {
                console.log(err);
            }
        }
        function loadsFast(params, path) {
            const connection = new Connection();
            let result = connection.get(params, path);
            return result;
        }
        function sortArrayStores(array) {
            let result = [];
            array.forEach((item) => {
                let newItem = { id: `${item.description.replace(/ /g, "-")}_${item.number}`, value: item.description }
                result.push(newItem);
            });
            return result;
        }
        loadInit();
    }, []);

    return (
        <div id="HomePage" className='d-flex h-100 flex-direction-colum '>
            {modAdditional &&
                <AddItems
                    itemForm={itemForm}
                    selectForm={selectForm}
                    setLogSales={reloadTotalAdd}
                    setModAdditional={setModAdditional}
                    logSales={logSales}
                    signal={signal}
                />
            }
            <form className="col-5 p-1">
                <ClientField
                    itemForm={itemForm}
                    orderCod={orderCod}
                    setOrderCod={setOrderCod}
                    nameClient={nameClient}
                    setNameClient={formatName}
                    foneClient={foneClient}
                    setFoneClient={setFoneClient}
                    email={email}
                    setEmail={setEmail}
                    dateOrder={dateOrder}
                    setDateOrder={setDateOrder}
                />
                <OrderField
                    itemForm={itemForm}
                    selectForm={selectForm}
                    menusList={menusList}
                    setMenusList={setMenusList}
                    riceList={riceList}
                    setRiceList={setRiceList}
                    dessertsList={dessertsList}
                    setDessertsList={setDessertsList}
                    signal={signal}
                    setSignal={setSignal}
                    total={total}
                    setTotal={setTotal}
                    logSales={logSales}
                    pending={pending}
                    setPedding={setPedding}
                    setLogSales={setLogSales}
                    logsMenusList={logsMenusList}
                    setObservation={setObservation}
                    observation={observation}
                    setModAdditional={setModAdditional}
                    pluMenu={pluMenu}
                    setPluMenu={setPluMenu}
                    menu={menu}
                    setMenu={setMenu}
                    rice={rice}
                    setRice={setRice}
                    dessert={dessert}
                    setDessert={setDessert}
                />
                <DeliveryField
                    itemForm={itemForm}
                    selectForm={selectForm}
                    setDateDelivery={setDateDelivery}
                    setHoursDelivery={setHoursDelivery}
                    setLocalDelivery={setLocalDelivery}
                    dateDelivery={dateDelivery}
                    hoursDelivery={hoursDelivery}
                    localDelivery={localDelivery}
                    stores={storeList}
                />
                {buttonsForm()}
            </form>
            <section className="col p-1">
                <OrderCardList ordersList={ordersList} load={load} />
            </section>
        </div>
    )
    function itemForm(label, placInput, titleInput, typeInput, divLength, value, funSetValue, enabled, funAssistant, mandatory) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`}>
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <input data-mandatory={mandatory ? 1 : 0} min={0} placeholder={placInput ? placInput : ""} type={typeInput} title={titleInput ? titleInput : ""} onKeyUp={(event) => { funAssistant && funAssistant(event.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} className="form-control p-1" disabled={enabled} value={value} />
            </div>
        )
    }

    function buttonsForm() {
        return (
            <div id="divGroupButton">
                <div id="divGroupButtonLeft">
                    <button type="button" onClick={() => { create() }} title="salvar pedido.">Inserir</button>
                    <button type="button" onClick={() => { update() }} title="salvar Alteração.">Alterar</button>
                    <button type="button" onClick={() => { del() }} title="Excluir pedido.">Excluir</button>
                    <button type="button" onClick={() => { clean() }} title="Limpar formulário.">Limpar</button>
                </div>
                <div id="divGroupButtonRigth">
                    <button type="button" onClick={() => { delivered() }}><FontAwesomeIcon icon="fa-truck" /></button>
                    <button type="button" onClick={() => { print() }}><FontAwesomeIcon icon="fa-print" /></button>
                </div>
            </div>
        )
    }

    async function create() {
        try {
            let fields = mandatoryFields();
            borderError(fields);
            let values = validiteValues();
            if (fields.length > 0) throw new Error("Preencha todos os campos obrigatórios.");
            if (values.error) throw new Error(values.message);
            let order = await postOrder();
            if (order.error) throw new Error(order.message);
            await postLogs(order.last_id);
            cleanPage();
        } catch (error) {
            alert(error);
        }
    }
    async function postOrder() {
        let order = new Order(null, foneClient, email, signal, pluMenu, menu, rice, dessert, nameClient, logSales, '0', localStorage.getItem('store'), localStorage.getItem('id'), dateOrder, dateDelivery, hoursDelivery, localDelivery, total, observation);
        let req = await connection.post(order, "EPP/Order.php");
        return req;
    }
    async function postLogs(id_order) {
        let req = [];
        logSales.forEach(log => {
            log.epp_id_order = id_order;
            req.push(postsFast(log, "EPP/LogSale.php"))
        })
        await Promise.all(req).then(value => {
            console.log(value);
        });
        console.log(logSales, id_order);
    }
    function postsFast(params, path) {
        const connection = new Connection();
        let result = connection.post(params, path);
        return result;
    }

    function validiteValues() {
        let result = { error: false, message: '' };
        if (signal <= 0) result.message += "O valor do sinal, não pode estar negativos ou zerados. \n";
        if (pending < 0) result.message += "O valor pendente de pagamento não pode ser negativo. \n";
        if (total <= 0) result.message += "O valor total, não pode estar negativos ou zerados. \n";
        if (result.message !== '') result.error = true;
        return result;
    }
    function mandatoryFields() {
        let fields = document.querySelectorAll('*[data-mandatory="1"]');
        let voidItems = [];
        fields.forEach(field => {
            if (!field.value || field.value === '0') {
                voidItems.push(field);
            }
        });
        return voidItems;
    }
    function borderError(elements) {
        elements.forEach(element => {
            element.classList.add('border-danger');
        })
    }
    async function update() {
        console.log("Atualizar")
    }
    async function del() {
        console.log("Deletar/Inativar")
    }
    function clean() {
        cleanPage();
    }
    function print() {
        console.log("Imprimir")
    }
    function delivered() {
        console.log("Entregue")
    }

    function selectForm(label, divLength, list, defaultValue, funSetValue, funAssistant, mandatory) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`}>
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <select data-mandatory={mandatory ? 1 : 0} className="form-control p-1" onClick={(element) => { funAssistant && funAssistant(element.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} value={defaultValue}>
                    <option value="0" hidden>Selecione</option>
                    {list.map((item, index) => <option key={index} value={item.id}>{item.value}</option>)}
                </select>
            </div>
        );
    }
    function formatName(text) {
        setNameClient(util.maskName(text));
    }
    function resetClass(element) {
        if (element.classList.contains('border-danger')) {
            element.classList.remove('border-danger');
        }
    }
    function reloadTotalAdd(array) {
        let items = array;
        setLogSales([...array])
        let relTotal = 0.0;
        items.forEach(lSale => {
            relTotal += parseFloat(lSale.price);
        });
        setPedding(relTotal - signal);
        setTotal(relTotal);
    }
    function cleanPage() {
        setRiceList([]);
        setDessertsList([]);
        setOrderCod("");
        setNameClient("");
        setFoneClient("");
        setEmail("");
        setDateOrder(util.dateCurrent());
        setObservation("");
        setSignal("");
        setTotal("");
        setPedding('');
        setDateDelivery("");
        setHoursDelivery("");
        setLocalDelivery("");
        setPluMenu("");
        setMenu("");
        setRice("");
        setDessert("");
        setLogSales([]);
        setModAdditional(false);
    }

    async function load() {
        let value = ordersList.filter(i => i.idOrder === '2354')[0]

        console.log(value);
        let log = await connection.get(`&epp_id_order=${value.idOrder}`, "EPP/LogSale.php");
        setOrderCod(value.idOrder);
        setNameClient(value.nameClient);
        setFoneClient(value.fone || "");
        setEmail(value.email || "");
        setDateOrder(value.dateOrder || "");
        setObservation(value.obs || "");
        setSignal(parseFloat(value.signalValue).toFixed(2) || "");
        setTotal(util.maskMoney(value.total) || "");
        setPedding(util.maskMoney(value.total - value.signalValue) || '');
        setDateDelivery(value.deliveryDate || "");
        setHoursDelivery(value.deliveryHour || "");
        setLocalDelivery(value.deliveryStore || "");
        setPluMenu(value.pluMenu || "");
        setMenu(value.idMenu || "");
        setRice("");
        setDessert("");
        setLogSales(loadLogSale(log.data));
        setModAdditional(false);
    }
    function loadLogSale(array){
        let result = [];
        array.forEach(item=>{
            let sale = new LogSales(item.eppIdLog,item.eppIdProduct,item.eppIdOrder,item.quantity,item.price,item.menu ,null,null,item.menu === '1'?true:false);
            sale.requestItem();
            result.push(sale);
        })
        console.log(result);
        return result;
    }
}