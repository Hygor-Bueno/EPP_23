// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Order } from '../../Class/Order';
import Util from '../../Util/Util';
import ClientField from '../FieldsForm/ClientField';
import DeliveryField from '../FieldsForm/DeliveryField';
import OrderField from '../FieldsForm/OrderField';
import AddItems from '../AddItems';
import OrderCardList from '../OrderCardList';
import LogSales from '../../Class/LogSale';
import ModalDefault from '../Modal/ModalDefault';
import './Home.css';
import PrintOrder from '../PrintOrder';

export default function Home() {
    const util = new Util();
    const connection = new Connection();
    const storeUser = `${localStorage.getItem('store')}_${localStorage.getItem('num_store')}`;
    const [menusList, setMenusList] = useState([]);
    const [riceList, setRiceList] = useState([]);
    const [dessertsList, setDessertsList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [logsMenusList, setLogsMenusList] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [paramsModal, setParamsModal] = useState(
        {
            type: "",
            message: "",
            title: "",
            isConfirmation: isOpenModal,
            onConfirm: () => console.log('Confirm')
        }
    );
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
                let orderList = loadsFast(`&deliveryStore=${storeUser}`, 'EPP/Order.php');
                let storeLists = loadsFast('&company_id=1', 'CCPP/Shop.php');
                let menuList = loadsFast(null, 'EPP/Menu.php');
                let logMenu = loadsFast(null, 'EPP/LogMenu.php');
                await Promise.all([storeLists, menuList, orderList, logMenu]).then(value => {
                    if (value[0].error) throw new Error(value[0].message);
                    if (value[1].error) throw new Error(value[1].message);
                    if (value[2].error && !value[2].message.toUpperCase().includes('NO DATA')) throw new Error(value[2].message);
                    setStoreList(sortArrayStores(value[0].data));
                    value[1].data.unshift({ idMenu: "0", description: "Avulso", status: "1" })
                    setMenusList(value[1].data);
                    setOrdersList(value[2].data || [])
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
    }, [storeUser]);
    useEffect(() => { console.log(foneClient) }, [foneClient]);

    return (
        <div id="HomePage" className='d-flex h-100 flex-direction-colum '>
            <ModalDefault
                isOpen={isOpenModal}
                {...paramsModal}
                onCancel={setIsOpenModal}
                onClose={setIsOpenModal}
            >
                <div>
                    <p>{paramsModal.message}</p>
                </div>
            </ModalDefault>
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
                    setFoneClient={changeFone}
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
                    cleanOrder={cleanOrder}
                    setParamsModal={setParamsModal}
                    setIsOpenModal={setIsOpenModal}
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

    function changeFone(fone) {
        // Remove todos os caracteres que não sejam dígitos
        const numbersOnly = fone.replace(/[^0-9]/g, '');
        setFoneClient(numbersOnly);
      }
    function buttonsForm() {
        return (
            <div id="divGroupButton">
                <div id="divGroupButtonLeft">
                    <button className={orderCod ? "opacity-25" : "opacity-100"} disabled={orderCod ? true : false} type="button" onClick={() => { create() }} title="salvar pedido.">Inserir</button>
                    <button type="button" onClick={() => { update() }} title="salvar Alteração.">Alterar</button>
                    <button type="button" onClick={() => { del() }} title="Excluir pedido.">Excluir</button>
                    <button type="button" onClick={() => { clean() }} title="Limpar formulário.">Limpar</button>
                </div>
                <div id="divGroupButtonRigth">
                    <button type="button" onClick={() => { delivered() }}><FontAwesomeIcon icon="fa-truck" /></button>
                    <PrintOrder
                        orderCod={orderCod}
                        nameClient={nameClient}
                        dateOrder={dateOrder}
                        signal={signal}
                        total={total}
                        menu={menu}
                        pluMenu={pluMenu}
                        rice={rice}
                        dessert={dessert}
                        dateDelivery={dateDelivery}
                        hoursDelivery={hoursDelivery}
                        localDelivery={localDelivery}
                        logSales={logSales}
                    />
                </div>
            </div>
        );
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
            let newListOrder = ordersList;
            newListOrder.push(maskItem(order.last_id));
            setOrdersList([...newListOrder]);
        } catch (error) {
            startModalError(error);
        }
    }
    function maskItem(idOrder) {
        let item = {};
        item.delivered = 0;
        item.deliveryDate = dateDelivery;
        item.deliveryHour = hoursDelivery;
        item.deliveryStore = localDelivery;
        item.fone = foneClient;
        item.idOrder = idOrder;
        item.nameClient = nameClient;
        item.signalValue = signal;
        item.total = parseFloat(total);
        return item;
    }
    async function postOrder() {
        let order = new Order(null, foneClient, email, signal, pluMenu, menu, rice, dessert, nameClient, logSales, '0', storeUser, localStorage.getItem('id'), dateOrder, dateDelivery, hoursDelivery, localDelivery, total, observation);
        let req = await connection.post(order, "EPP/Order.php");
        return req;
    }
    async function postLogs(id_order) {
        let req = [];
        logSales.forEach(log => {
            log.epp_id_order = id_order;
            req.push(postsFast(log, "EPP/LogSale.php"))
        });
        // await Promise.all(req).then(value => {
        //     console.log(value);
        // });
    }
    function postsFast(params, path) {
        const connection = new Connection();
        let result = connection.post(params, path);
        return result;
    }
    function validiteValues() {
        let result = { error: false, message: '' };
        if (signal <= 0) result.message += "O valor do sinal não pode estar negativos ou zerados. \n";
        if (pending < 0) result.message += "O valor pendente de pagamento não pode ser negativo. \n";
        if (total <= 0) result.message += "O valor total não pode estar negativos ou zerados. \n";
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
        try {
            let cancel = await connection.put({ id_order: orderCod, delivered: 2 }, "EPP/Order.php");
            if (cancel.error) throw new Error(cancel.message);
            let index = ordersList.findIndex((item) => parseInt(item.idOrder) === parseInt(orderCod));
            if (index === -1) throw new Error('Item não encontrado!');
            ordersList.splice(index, 1);
            let newList = ordersList;
            setOrdersList([...newList]);
        } catch (error) {
            startModalError(error);
        }
        clean();
    }
    function startModalError(error) {
        setIsOpenModal(true);
        setParamsModal({
            type: "Error",
            message: error.toString(),
            title: "Erro!",
            isConfirmation: false,
            onConfirm: ""
        });
    }
    function clean() {
        cleanPage();
    }
    async function delivered() {
        setIsOpenModal(true);
        setParamsModal({
            type: "Alert",
            message: 'Deseja mesmo realizar essa ação?',
            title: "Atenção!",
            isConfirmation: true,
            onConfirm: setStatusDelivered
        });
    }

    async function setStatusDelivered() {
        try {
            let deliver = await connection.put({ id_order: orderCod, delivered: 1 }, "EPP/Order.php");
            if (deliver.error) throw new Error(deliver.message);
            let index = ordersList.findIndex((item) => parseInt(item.idOrder) === parseInt(orderCod));
            if (index === -1) throw new Error('Item não encontrado!');
            ordersList.splice(index, 1);
            let newList = ordersList;
            setOrdersList([...newList]);
        } catch (error) {
            startModalError(error);
        }
        clean();

    }
    function selectForm(label, divLength, list, defaultValue, funSetValue, funAssistant, mandatory) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`}>
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <select data-mandatory={mandatory ? 1 : 0} className="form-control p-1" onClick={(element) => { funAssistant && funAssistant(element.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} value={defaultValue}>
                    <option value="" hidden>Selecione</option>
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
        cleanOrder();
        setLogSales([]);
        setModAdditional(false);
    }
    function cleanOrder() {
        setPluMenu("");
        setMenu("");
        setRice("");
        setDessert("");
    }
    async function load(idItem) {
        try {
            let log = idItem.trim() && await connection.get(`&epp_id_order=${idItem}`, "EPP/LogSale.php");
            let order = idItem.trim() && await connection.get(`&id_order=${idItem}`, "EPP/Order.php");
            let logSales = idItem.trim() && await loadLogSale(log.data || []);
            // util.formatJsonForSelect(props.riceList, "idProduct", "description")
            loadRiceDessert(order.data[0].typeRice, order.data[0].dessert);
            if (!log || log.error) throw new Error(log.message);
            if (!order || order.error) throw new Error(order.message);
            if (!logSales || logSales.error) throw new Error(logSales.message);

            setOrderCod(order.data[0].idOrder);
            setNameClient(order.data[0].nameClient);
            setFoneClient(order.data[0].fone || "");
            setEmail(order.data[0].email || "");
            setDateOrder(order.data[0].dateOrder || "");
            setObservation(order.data[0].obs || "");
            setSignal(parseFloat(order.data[0].signalValue).toFixed(2) || "");
            setTotal(order.data[0].total || "");
            setPedding(util.maskMoney(order.data[0].total - order.data[0].signalValue) || '');
            setDateDelivery(order.data[0].deliveryDate || "");
            setHoursDelivery(order.data[0].deliveryHour || "");
            setLocalDelivery(order.data[0].deliveryStore || "");
            setPluMenu(order.data[0].pluMenu || "");
            setMenu(order.data[0].idMenu || "");

            setLogSales(logSales.data);
            setModAdditional(false);
        } catch (error) {
            startModalError(error);
            cleanOrder();
        }
    }
    async function loadRiceDessert(idRice, idDessert) {
        let rice = await util.getConsincoProduct(idRice);
        let dessert = await util.getConsincoProduct(idDessert);
        let listRice = [], listDessert = [];

        if (rice) {
            listRice.push({ idProduct: rice["SEQPRODUTO"], description: rice["DESCREDUZIDA"] });
        } else {
            listRice.push({ idProduct: idRice, description: 'Não possui.' });
        }

        if (dessert) {
            listDessert.push({ idProduct: rice["SEQPRODUTO"], description: rice["DESCREDUZIDA"] });
        } else {
            listDessert.push({ idProduct: idDessert, description: 'Não possui.' });
        }

        setRice(idRice);
        setDessert(idDessert);
        setRiceList(listRice);
        setDessertsList(listDessert);
    }
    async function loadLogSale(array) {
        let result = { error: false, message: '', data: [] };
        for await (const item of array) {
            const sale = new LogSales(item.eppIdLog, item.eppIdProduct, item.eppIdOrder, item.quantity, item.price, item.menu, null, null, item.menu === '1' ? true : false);
            let getItem = await sale.requestItem();
            if(!sale.getMeasure()){
                let product = await sale.getProductEPP();
                sale.setMeasure(product.data[0].measure);
            }
            if (getItem.error) {
                result.error = true;
                result.message += `  Cód. Produto: ${item.eppIdProduct};`;
            }
            result.data.push(sale);
        }
        return result;
    }
}