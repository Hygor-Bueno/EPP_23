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
import Loading from '../loading/Loading';

export default function Home() {
    const util = new Util();
    const connection = new Connection();
    const storeUser = (localStorage.store && localStorage.num_store) ? `${localStorage.getItem('store').replace(/ /g, '-')}_${localStorage.getItem('num_store')}` : null;
    const [menusList, setMenusList] = useState([]);
    const [riceList, setRiceList] = useState([]);
    const [dessertsList, setDessertsList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [logsMenusList, setLogsMenusList] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [upProductLogs, setUpProductLogs] = useState(false);
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
    const [deliveredOrder, setDeliveredOrder] = useState('0');
    const [loading, setLoading] = useState(false);

    const [isPrintOrder, setIsPrintOrder] = useState(false);
    const [copyNumber, setCopyNumber] = useState(1);

    useEffect(() => {
        async function loadInit() {
            setLoading(true);
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
                    value[1].data.unshift({ idMenu: "0", description: "Avulso", status: "1" });
                    setMenusList(value[1].data);
                    setOrdersList(value[2].data || []);
                    setLogsMenusList(value[3].data);
                });
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
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
    useEffect(() => { console.log(deliveredOrder) }, [deliveredOrder]);
    return (
        <div id="HomePage" className='d-flex h-100 flex-direction-colum '>
            {quantityOrder()}
            <Loading
                isOpen={loading}
            />
            <ModalDefault
                isOpen={isOpenModal}
                {...paramsModal}
                onCancel={setIsOpenModal}
                onClose={setIsOpenModal}
            />
            {modAdditional &&
                <AddItems
                    itemForm={itemForm}
                    selectForm={selectForm}
                    setLogSales={reloadTotalAdd}
                    setModAdditional={setModAdditional}
                    logSales={logSales}
                    signal={signal}
                    setUpProductLogs={setUpProductLogs}
                    setLoading={setLoading}
                    startModalError={startModalError}
                    confirmModal={confirmModal}
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
                    deliveredOrder={deliveredOrder}
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
                    setUpProductLogs={setUpProductLogs}
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
                <OrderCardList loading={loading} setLoading={setLoading} ordersList={ordersList} load={load} />
            </section>
        </div>
    );
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
    function quantityOrder() {
        return (
            isPrintOrder &&
            <div id='divModalQuantityPrint' className='d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column bg-white col-4 rounded h-25'>
                    <div className='col-12 d-flex flex-row align-items-center justify-content-between px-2'>
                        <h3 >Quantidade de cópias</h3>
                        <button type='button' className='btn m-2' title='Sair da seleção de números de cópias.' onClick={() => { setIsPrintOrder(false); setCopyNumber(1) }}>
                            <FontAwesomeIcon icon={'fa fa-right-from-bracket'} size='xl' />
                        </button>
                    </div>
                    <div className='d-flex align-items-center justify-content-around h-100'>
                        <button type='button' className='btn btn-danger col-2' onClick={() => { let cont = copyNumber; setCopyNumber(cont - 1); }}>-</button>
                        <div className='col-6'>
                            <input type='number' step='1' value={copyNumber} disabled={true} className='form-control text-center' />
                        </div>
                        <button type='button' className='btn btn-success col-2' onClick={() => { let cont = copyNumber; setCopyNumber(cont + 1); }}>+</button>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button type="button" title='Imprimir' className='btn btn-primary m-2' onClick={() => copyOrder()}>Ok</button>
                    </div>
                </div>
            </div>
        );
    }
    function copyOrder(){
        for (let index = 0; index < copyNumber; index++) {
            document.getElementById('buttonPrintOrder').click();
        }
        setCopyNumber(1);
    }
    function buttonsForm() {
        return (
            <div id="divGroupButton">
                <div id="divGroupButtonLeft">
                    <button className={orderCod ? "opacity-25" : "opacity-100"} disabled={orderCod ? true : false} type="button" onClick={() => { create() }} title="salvar pedido.">Inserir</button>
                    <button className={orderCod && parseInt(deliveredOrder) === 0 ? "opacity-100" : "opacity-25"} disabled={orderCod ? false : true} type="button" onClick={() => { confirmModal('Alert', "Atenção!", 'Você está prestes a editar esse pedido, você tem certeza disso?', update) }} title="salvar Alteração.">Alterar</button>
                    <button className={orderCod && parseInt(deliveredOrder) === 0 ? "opacity-100" : "opacity-25"} disabled={orderCod ? false : true} type="button" onClick={() => { confirmModal('Alert', "Alerta de Exclusão!", 'Você está prestes a excluir esse pedido, você tem certeza disso?', deleteOrder) }} title="Excluir pedido.">Excluir</button>
                    <button type="button" onClick={() => { clean() }} title="Limpar formulário.">Limpar</button>
                </div>
                <div id="divGroupButtonRigth">
                    <button className={orderCod && parseInt(deliveredOrder) === 0 ? "opacity-100" : "opacity-50"} disabled={orderCod ? false : true} type="button" onClick={() => { confirmModal("Alert", "Atenção!", 'Deseja mesmo realizar essa ação?', setStatusDelivered) }}><FontAwesomeIcon icon="fa-truck" /></button>
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
                        observation={observation}
                        deliveredOrder={deliveredOrder}
                        setIsPrintOrder={setIsPrintOrder}
                        isPrintOrder={isPrintOrder}
                        copyNumber={copyNumber}

                    />
                </div>
            </div>
        );
    }

    async function create() {
        setLoading(true);
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
            messageModal('success', 'Sucesso!', 'Pedido Inserido com sucesso.');
            document.getElementById('buttonPrintOrder').click();
        } catch (error) {
            startModalError(error);
        }
        setLoading(false);
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
        let order = assembleOrder();
        let req = await connection.post(order, "EPP/Order.php");
        return req;
    }
    async function updateOrder() {
        let order = assembleOrder();
        let req = await connection.put(order, "EPP/Order.php");
        cleanPage();
        return req;
    }
    function assembleOrder() {
        let order = new Order(orderCod ? orderCod : null, foneClient, email, signal, pluMenu, menu, rice, dessert, nameClient, logSales, deliveredOrder, storeUser, localStorage.getItem('id'), dateOrder, dateDelivery, hoursDelivery, localDelivery, total, observation);
        return order;
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
        let result = await Promise.all(req);
        return result;
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
        setLoading(true);
        try {
            let fields = mandatoryFields();
            borderError(fields);
            let values = validiteValues();
            if (fields.length > 0) throw new Error("Preencha todos os campos obrigatórios.");
            if (values.error) throw new Error(values.message);
            let reqOrder = await updateOrder();
            if (reqOrder.error) throw new Error(reqOrder.message);
            if (upProductLogs) {
                let delLogOrder = await connection.delete({ epp_id_order: orderCod }, 'EPP/LogSale.php');
                if (!delLogOrder.error) {
                    let addLosg = await postLogs(orderCod);
                    if (addLosg.error) throw new Error(addLosg.message);
                } else {
                    throw new Error(delLogOrder.message);
                }
            }
            let order = maskItem(orderCod);
            let newOrdersList = util.changeItemList(ordersList, 'idOrder', orderCod, order);
            setOrdersList([...newOrdersList]);
        } catch (error) {
            startModalError(error);
        }
        setLoading(false);
    }

    async function deleteOrder() {
        setLoading(true);
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
        setLoading(false);
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

    async function confirmModal(typeModal, titleModal, messageModal, funcConfirm) {
        setIsOpenModal(true);
        setParamsModal({
            type: typeModal,
            message: messageModal,
            title: titleModal,
            isConfirmation: true,
            onConfirm: funcConfirm
        });
    }
    async function messageModal(typeModal, titleModal, messageModal) {
        setIsOpenModal(true);
        setParamsModal({
            type: typeModal,
            message: messageModal,
            title: titleModal,
            isConfirmation: false
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
        setUpProductLogs(false);
        setDeliveredOrder('0');
    }
    function cleanOrder() {
        setPluMenu("");
        setMenu("");
        setRice("");
        setDessert("");
    }
    async function load(idItem) {
        setLoading(true);
        try {
            let log = idItem.trim() && await connection.get(`&epp_id_order=${idItem}`, "EPP/LogSale.php");
            let order = idItem.trim() && await connection.get(`&id_order=${idItem}`, "EPP/Order.php");
            let logSales = idItem.trim() && await loadLogSale(log.data || []);
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
            setTotal(parseFloat(order.data[0].total).toFixed(2) || "");
            setPedding(util.maskMoney(order.data[0].total - order.data[0].signalValue) || '');
            setDateDelivery(order.data[0].deliveryDate || "");
            setHoursDelivery(order.data[0].deliveryHour || "");
            setLocalDelivery(order.data[0].deliveryStore || "");
            setPluMenu(order.data[0].pluMenu || "");
            setMenu(order.data[0].idMenu || "");
            setDeliveredOrder(order.data[0].delivered);
            setLogSales(logSales.data);
            setModAdditional(false);
        } catch (error) {
            startModalError(error);
            cleanOrder();
        }
        setLoading(false);
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
        let req = [];
        let sales = [];
        array.forEach(item => {
            const sale = new LogSales(item.eppIdLog, item.eppIdProduct, item.eppIdOrder, item.quantity, item.price, item.menu, null, null, item.menu === '1' ? true : false);
            req.push(sale.requestItem());
            sales.push(sale);
        })
        await Promise.all(req);
        result = await includeMeasure(sales)
        return result;
    }

    async function includeMeasure(array) {
        let response = { error: false }
        try {
            let req = [];
            let sales = [];
            array.forEach(sale => {
                if (!sale.getMeasure()) {
                    req.push(sale.getProductEPP());
                }
            })
            let result = await Promise.all(req);
            result.forEach(item => {
                if (!item.error) {
                    array.forEach(sale => {
                        if (parseInt(sale.epp_id_product) === parseInt(item.data[0].id_product)) {
                            sale.setMeasure(item.data[0].measure);
                            sales.push(sale)
                        }
                    });
                }
            });
            let error = errorMeasure(result);
            if (error.error) throw new Error(error.message);
            response.data = sales;
            return response;
        } catch (error) {
            response.error = true;
            response.message = error.toString();
            return response;
        }
    }
    function errorMeasure(array) {
        let error = { error: false, message: '' };
        array.forEach(item => {
            if (item.error) {
                error.error = true;
                error.message = 'Um ou mais itens não carregaram as Uniades de medida corretamente!'
            }
        });
        return error;
    }
}