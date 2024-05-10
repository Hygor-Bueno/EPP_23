import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './OrderCardList.css'
import Util from '../Util/Util';

export default function OrderCardList(props) {
    const [idOrder, setIdOrder] = useState('');
    // useEffect(() => {
    //     console.log(props.ordersList);
    // }, [props.ordersList]);
    return (
        <div id="divOrderCard">
            <div >
                <span className="d-flex align-items-center col-3">
                    <input placeholder="Cód. do Pedido" value={idOrder} onChange={(element) => setIdOrder(element.target.value)} className="form-control" type='text' />
                    <button type="button" onClick={() => { props.load(idOrder); setIdOrder(''); }}><FontAwesomeIcon icon={"fa-search"} /></button>
                </span>
            </div>
            <article>
                {props.ordersList.map((item) => cardTemplate(item))}
            </article>
        </div>
    );
    function cardTemplate(item) {
        let util = new Util();
        return (
            <div onClick={() => { props.load(item.idOrder); }} className="px-2 m-1" key={`order_${item.idOrder}`}>
                <div className="row">
                    {itemsComponent("Nº", item.idOrder, 'col-2')}
                    {itemsComponent("Nome", item.nameClient, 'col-6')}
                    {itemsComponent("Local", item.deliveryStore.replace("-", " ").split("_")[0], 'col-2')}
                    {itemsComponent("Status", iconsStatus(item.delivered), 'col-2')}
                </div>
                <div className='row'>
                    {itemsComponent("Data", util.convertDateBR(item.deliveryDate), 'col-2')}
                    {itemsComponent("Hora", item.deliveryHour, 'col-1')}
                    {itemsComponent("Fone", item.fone, 'col-3')}
                    {itemsComponent("Sinal", util.maskMoney(item.signalValue), 'col-2')}
                    {itemsComponent("Pendente", util.maskMoney(item.total - item.signalValue), 'col-2')}
                    {itemsComponent("Total", util.maskMoney(item.total), 'col-2')}
                </div>
            </div>
        );
    }
    function itemsComponent(tag, value, col) {
        return (
            <span className={`d-flex flex-column my-1 ${col}`}>
                <b>{tag}: </b><label>{value}</label>
            </span>
        );
    }
    function iconsStatus(value) {
        let result;
        switch (parseInt(value)) {
            case 0:
                result = <FontAwesomeIcon title="Pendente" className="text-warning" icon={'fa-circle-exclamation'} />
                break;
            case 1:
                result = <FontAwesomeIcon title="Entregue" className="text-success" icon={'fa-circle-check'} />
                break;
            case 2:
                result = <FontAwesomeIcon title="cancelado" className="text-danger" icon={'fa-circle-xmark'} />
                break;
            default:
                console.log("Valor incorreto")
        }
        return result;
    }
}