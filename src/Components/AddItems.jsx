import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Connection } from '../Util/RestApi'
import './AddItems.css';
import Util from '../Util/Util';
import LogSales from '../Class/LogSale';

export default function AddItems(props) {
    const util = new Util();
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState(0);
    const [filterCtl, setFilterCtl] = useState(false);
    const [logSales, setLogSales] = useState([]);
    const [subtotal, setSubtotal] = useState(0);


    useEffect(() => {
        let connection = new Connection();
        let localUtil = new Util();
        async function init() {
            props.setLoading(true);
            try {
                const result = await connection.get('', "EPP/Product.php");
                const cat = await connection.get("&category=1", "EPP/Product.php");
                if (cat.error) throw new Error(cat.message);
                if (result.error) throw new Error(result.message);
                setCategoryList(cat.data);
                setProductList(addCheck(result.data));
                populateSaleLocal();
            } catch (err) {
                props.startModalError(err.toString());
            }
            props.setLoading(false);
        }
        function addCheck(array) {
            let result = []
            array.forEach(item => {
                let response = localUtil.filterArray(props.logSales, 'epp_id_product', item.id_product);
                item.checked = response ? true : false;
                item.quantity = response ? response.quantity : '';
                result.push(item);
            });
            return result;
        }
        function populateSaleLocal() {
            let sale = [];
            props.logSales.forEach(product => {
                sale.push(product);
            });
            setSubtotal(localUtil.reloadTotal(sale, 'price'));
            setLogSales([...sale])
        }
        init();
    }, []);

    return (
        <div id='divAddItems' className="" role="dialog">
            <div>
                <section>
                    <form id='formHeadAddItems'>
                        <fieldset className='row'>
                            <legend>Buscar produtos</legend>
                            {props.itemForm("Descrição:", "Nome do produto", "Digite o nome do produto", "text", 8, product, forDescription, false)}
                            {props.selectForm("Categoria:", 4, util.formatJsonForSelect(categoryList, "id_category", "cat_description"), category, forCategory)}
                        </fieldset>
                    </form>
                    <div id='divBodyAddItems'>
                        {(category !== 0 || product !== '') && productComponent()}
                    </div>
                </section>
                <aside>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Itens Selecionados:</h1>
                        <div id='divContainerPrice'>
                            <i className="totalItems">{subtotal.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</i>
                        </div>
                    </div>
                    <article>
                        {logSales.map((item, index) => (
                            <div className="d-flex flex-column" key={index}>
                                <span className='d-flex justify-content-between'>
                                    <div><b>Cód: </b>{item.epp_id_product}</div>
                                    <button type="button" className="btn btn-danger p-0 d-flex align-items-center justify-content-center" onClick={() => {
                                        let newItem = productList.filter(element => element.id_product === item.epp_id_product);
                                        setValueProduct(newItem[0].id_product, "checked", false);
                                        if (newItem[0].checked === false) clearValue(newItem[0]);
                                    }}><FontAwesomeIcon icon="fa-trash-alt" /></button>
                                </span>
                                <span>
                                    <b>Descrição: </b>{item.getDescription()}. {item.quantity} {item.getMeasure()} (Preço Un/Kg R$ {item.getPrice_base()})
                                </span>
                                <span>
                                    <b>SubTotal: </b>{item.price.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        )
                        )}
                    </article>
                    <footer>
                        <div>
                            <button disabled={util.isEquals(logSales, props.logSales)} className={util.isEquals(logSales, props.logSales) ? 'opacity-50' : 'opacity-100'} title="Salvar ajustes" onClick={() => {
                                try {
                                    let resp = validateVoidProduct();
                                    if (resp.error) throw new Error(resp.message);
                                    validateBaseItem(logSales) && props.cleanOrder();
                                    props.setLogSales(logSales);
                                    props.setModAdditional(false);
                                    props.setUpProductLogs(true);
                                } catch (error) {
                                    props.startModalError(error.toString());
                                }
                            }} type="button">
                                <FontAwesomeIcon icon="fa-check-square" className='text-success' />
                            </button>
                            <button type="button" title="Limpar lista" onClick={() => { props.confirmModal('alert', 'Limpar Lista.', "Atenção! todos os itens serão deletados, deseja mesmo continuar? ", restartLogSales) /*restartLogSales()*/ }}><FontAwesomeIcon icon="fa-trash-alt" className='text-danger' /></button>
                            <button type="button" title="Sair. (Nenhuma alteração será realizada.)" onClick={() => {
                                !util.isEquals(logSales, props.logSales) ?
                                    props.confirmModal('alert', 'Sair.', "Todas as alterações serão perdidas, deseja continuar? ", () => props.setModAdditional(false)) :
                                    props.setModAdditional(false);
                            }
                            }>
                                <FontAwesomeIcon icon="fa-right-from-bracket" />
                            </button>
                        </div>
                    </footer>
                </aside>
            </div>
        </div>
    );
    function validateBaseItem(array) {
        let result = true;
        array.forEach(item => {
            if (parseInt(item.epp_id_product) === parseInt(props.pluMenu)) result = false;
        });
        return result;
    }
    function restartLogSales() {
        let list = []
        logSales.forEach((product) => {
            let result = util.filterArray(productList, "id_product", product.epp_id_product);
            result && list.push(result);
        });
        list.forEach(item => {
            setValueProduct(item.id_product, "checked", false);
            clearValue(item);
        });
    }
    function productComponent() {
        let result = filterCtl ?
            productList.filter(item => returnItens(item, 'description'))
            :
            productList.filter(item => returnItensForCategory(item, 'id_category'));
        return result.map((item, index) => cardItem(item, index));
    }
    function validateVoidProduct() {
        let response = { error: false, message: '' }
        let list = logSales;
        let result = list.filter((item) => (parseFloat(item.quantity) === 0 || item.quantity === ''));
        if (result.length > 0) {
            response.error = true;
            response.message = 'Não é permitido itens, com quantidade zerada. Ajuste a quantidade ou exclua o(s) item(ns)'
        }
        return response;
    }

    function cardItem(item, index) {
        return (
            <div className="cardItem" key={index}>
                <div>
                    <input checked={item.checked} id={`product_${item.id_product}`} onChange={async () => {
                        setValueProduct(item.id_product, "checked", !item.checked);
                        if (item.checked === false) clearValue(item);
                    }} type="checkbox" title={`selecione o item ${item.description}`} /> <label htmlFor={`product_${item.id_product}`}>{item.description}</label>
                </div>
                <input className="form-control" disabled={!item.checked} value={item.quantity}
                    onChange={async (element) => { if (item.checked) calculateSubTotal(item, element.target.value); }}
                    onBlur={(element) => checkedItem(element, item)} type="number" min="0" step={item.measure.toUpperCase() === 'KG' ? 0.5 : 1} placeholder={item.measure.toUpperCase()} />
            </div>
        );
    }

    async function calculateSubTotal(item, value) {
        if (item.measure.toUpperCase() !== 'KG' && value && value.includes('.')) {
            value = 0;
            props.startModalError("Este item é vendido apenas por unidade, por favor não utilizar ponto ou vírgula.");
        };
        if (parseFloat(value) < 0) {
            value = 0;
            props.startModalError("Não é permitido itens negativos.");
        };

        setValueProduct(item.id_product, "quantity", value);
        let log = new LogSales(null, item.id_product, null, item.quantity, null, parseInt(item.id_category_fk) === 1 ? 1 : 0, item.description, item.measure);
        await log.addItem();
        let result = util.addItemLogSale(logSales, log);
        setLogSales([...result]);
        setSubtotal(util.reloadTotal(result, 'price'));
    }
    function checkedItem(element, item) {
        let result = validateQuantity(element.target.value, item.measure);
        if (result.error) props.startModalError(result.message);
        if (result.restart) calculateSubTotal(item, 0);
        if (element.target.value === '') calculateSubTotal(item, 0);
    }
    function validateQuantity(quantity, type) {
        let result = { error: false, message: '', restart: false };
        if (quantity >= 10) {
            result.error = true;
            result.message += `Você está tentando adicionar ${quantity} ${type}, desse item. \n`;
        }
        return result;
    }
    function returnItens(value, key) {
        return value[key].toUpperCase().includes(product.toUpperCase());
    }
    function returnItensForCategory(value, key) {
        return value[key] === category;
    }
    function forCategory(value) {
        setFilterCtl(false);
        setCategory(value);
        setProduct('');
    }
    function forDescription(value) {
        setFilterCtl(true);
        setCategory(0);
        setProduct(value);
    }
    function setValueProduct(idItem, keyArray, value) {
        let markup = getPositionArray(idItem);
        let result = productList;
        result[markup][keyArray] = value;
        setProductList([...result]);
    }
    function getPositionArray(idItem) {
        let markup = null;
        productList.forEach((item, index) => {
            if (item["id_product"] === idItem) {
                markup = index;
            }
        });
        return markup;
    }
    function clearValue(item) {
        setValueProduct(item.id_product, "quantity", '');
        let remove = util.existItem(logSales, item.id_product);
        let newLog = logSales;
        if (remove.exist) newLog.splice(remove.position, 1);
        setSubtotal(util.reloadTotal(newLog, 'price'));
    }
}