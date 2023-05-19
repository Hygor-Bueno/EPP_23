import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import ProductField from '../FieldsForm/ProductField';
import ProductMenuField from '../FieldsForm/ProductMenuField';
import MenuField from '../FieldsForm/MenuField';
import AddItems from '../AddItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Order } from '../../Class/Order';
import ProductsMenuTable from '../ProductsMenuTable';
import LogSales from '../../Class/LogSale';
import './Product.css'

export default function Product() {
    const util = new Util();
    const connection = new Connection();
    const [menusList, setMenusList] = useState([]);
    const [riceList, setRiceList] = useState([]);
    const [dessertsList, setDessertsList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [logsMenusList, setLogsMenusList] = useState([]);


    //Valores selecionados no formulário:
    const [orderCod, setOrderCod] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [valProduct, setValProduct] = useState("");
    const [category, setCategory] = useState("");
    const [descMenu, setDescMenu] = useState("");
    const [statusMenu, setStatusMenu] = useState("");
    const [pack, setPack] = useState("");
    const [observation, setObservation] = useState("");
    const [signal, setSignal] = useState("");
    const [total, setTotal] = useState("");
    const [pending, setPedding] = useState('');

    const [pluMenu, setPluMenu] = useState("");
    const [menu, setMenu] = useState("");
    const [rice, setRice] = useState("");
    const [dessert, setDessert] = useState("");

    const [logSales, setLogSales] = useState([]);
    const [modAdditional, setModAdditional] = useState(false);

    useEffect(() => {
        async function loadInit() {
            try {
                let productsList = loadsFast("", 'EPP/Order.php');
                let menuList = loadsFast(null, 'EPP/Menu.php');
                let logMenu = loadsFast(null, 'EPP/LogMenu.php');
                await Promise.all([menuList, productsList, logMenu]).then(value => {
                    if (value[0].error) throw new Error(value[0].message);
                    if (value[1].error) throw new Error(value[1].message);
                    if (value[2].error && !value[2].message.toUpperCase().includes('NO DATA')) throw new Error(value[2].message);
                    value[1].data.unshift({ idMenu: "", description: "Avulso", status: "1" })
                    setMenusList(value[1].data);
                    setProductsList(value[2].data)
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

        /*function sortArrayStores(array) {
            let result = [];
            array.forEach((item) => {
                let newItem = { id: `${item.description.replace(/ /g, "-")}_${item.number}`, value: item.description }
                result.push(newItem);
            });
            return result;
        }*/
        
        loadInit();
    }, []);

    return (
        <div id="ProductPage" className='d-flex h-100 flex-direction-colum '>
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
                <ProductField
                    itemForm={itemForm}
                    orderCod={orderCod}
                    setOrderCod={setOrderCod}
                    nameProduct={nameProduct}
                    setNameProduct={formatName}
                    valProduct={valProduct}
                    setValProduct={setValProduct}
                    setCategory={setCategory}
                    pack={pack}
                    setPack={setPack}
                    selectForm={selectForm}
                    category={category}
                />

                <MenuField
                    itemForm={itemForm}
                    descMenu={descMenu}
                    setDescMenu={setDescMenu}
                    statusMenu={statusMenu}
                    setStatusMenu={setStatusMenu}
                />
                <ProductMenuField
                    itemForm={itemForm}
                    selectForm={selectForm}
                />
                {buttonsForm()}
            </form>
            <section className="col p-1">
                <ProductsMenuTable productsList={productsList} load={load} />
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
            if (fields.length > 0) throw new Error("Preencha todos os campos obrigatórios.");
            let order = await postOrder();
            if (order.error) throw new Error(order.message);
            await postLogs(order.last_id);
            cleanPage();
        } catch (error) {
            alert(error);
        }
    }

    async function postOrder() {
        let order = new Order(null, valProduct, category, signal, pluMenu, menu, rice, dessert, nameProduct, logSales, '0', localStorage.getItem('store'), localStorage.getItem('id'), pack, total, observation);
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

                </select>
            </div>
        );
    }

    function formatName(text) {
        setNameProduct(util.maskName(text));
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
        setNameProduct("");
        setValProduct("");
        setCategory("");
        setPack(util.dateCurrent());
        setObservation("");
        setSignal("");
        setTotal("");
        setPedding('');
        setPluMenu("");
        setMenu("");
        setRice("");
        setDessert("");
        setLogSales([]);
        setModAdditional(false);
    }

    async function load() {
        let value = productsList.filter(i => i.idOrder === '2354')[0]

        console.log(value);
        let log = await connection.get(`&epp_id_order=${value.idOrder}`, "EPP/LogSale.php");
        setOrderCod(value.idOrder);
        setNameProduct(value.nameProduct);
        setValProduct(value.fone || "");
        setCategory(value.category || "");
        setPack(value.pack || "");
        setObservation(value.obs || "");
        setSignal(parseFloat(value.signalValue).toFixed(2) || "");
        setTotal(util.maskMoney(value.total) || "");
        setPedding(util.maskMoney(value.total - value.signalValue) || '');
        setPluMenu(value.pluMenu || "");
        setMenu(value.idMenu || "");
        setRice("");
        setDessert("");
        setLogSales(loadLogSale(log.data));
        setModAdditional(false);
    }

    function loadLogSale(array) {
        let result = [];
        array.forEach(item => {
            let sale = new LogSales(item.eppIdLog, item.eppIdProduct, item.eppIdOrder, item.quantity, item.price, item.menu, null, null, item.menu === '1' ? true : false);
            sale.requestItem();
            result.push(sale);
        })
        console.log(result);
        return result;
    }
}