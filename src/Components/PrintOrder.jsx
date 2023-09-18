import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Util from '../Util/Util';
// import './PrintOrder.css';
export default function PrintOrder(props) {
    const storeUser = `${localStorage.getItem('store')}_${localStorage.getItem('num_store')}`;
    const util = new Util();
    return (
        <button className={props.orderCod ? "opacity-100" : "opacity-50"} disabled={props.orderCod ? false : true} type="button" onClick={() => { print() }}><FontAwesomeIcon icon="fa-print" /></button>
    );
    async function print() {
        let additionalItems = props.logSales.filter(item => parseInt(item.menu) === 0);
        let addItems = addtionalItems(await formatAddItems(additionalItems));
        let menuItem = props.logSales.filter(item => parseInt(item.menu) === 1);
        // Cria uma nova janela
        const newWindow = window.open("", "_blank", "width=600,height=400");
        if (newWindow) {
            newWindow.document.open();
            newWindow.document.write(`
                <html>
                    <head>
                        <title>Título da Nova Janela</title>
                        <style>
                            /* Adicione estilos CSS aqui */
                            body {
                                background-color: #f1f2f5;
                                display:flex;
                                align-items: center;
                                justify-content:center;
                            }
                            body>div{
                                width:80mm;
                                background-color: white;
                                padding: 1.4vw;
                            }
                        </style>
                    </head>
                    <body>
                        <div>
                            <strong>ENCOMENDA CEIA PEGPESE</strong><br/>
                            <hr/>
                            Loja: ${storeUser.replace(/-/g, ' ').replace(/[_0-9]/g, '')}<br/>
                            Nº. Documento: ${props.orderCod}<br/>
                            Cliente: ${props.nameClient}<br/>
                            Data: ${util.convertDateBR(props.dateOrder)}<br/>
                            Sinal: R$ ${props.signal}<br/>
                            Pagar: R$ ${parseFloat(props.total - props.signal).toFixed(2)}<br/>
                            Total: R$ ${props.total}<br/>
                            <hr/>
                            Menu: ${props.menu}<br/>
                            Código: ${props.pluMenu}<br/>
                            Tipo do arroz: ${props.rice}<br/>
                            Sobremesa: ${props.dessert}<br/>
                            Subtotal: R$ ${parseFloat(menuItem[0].price).toFixed(2)}<br/>
                            <hr/>
                            Adicional:<br/>
                            ${addItems}<br/>
                            <hr/>
                            <strong>
                                Observação:<br/>
                                ${props.observation}
                            </strong>
                            <hr/>
                            Data Entrega: ${util.convertDateBR(props.dateDelivery)}<br/>
                            Horario: ${props.hoursDelivery}<br/>
                            Loja Entrega: ${props.localDelivery.replace(/-/g, ' ').replace(/[_0-9]/g, '')}<br/>
                            <hr/>
                            <strong>Atenção:</strong> Caso não venha retirar sua encomenda até a data reservada, 
                            consideraremos a desistência do seu pedido e não haverá estorno do valor.
                            <br/>
                            <br/>
            
                            __________________________________<br/>
                            Assinatura do Cliente<br/>
                            <br/>
                            __________________________________<br/>
                            Assinatura do Responsável<br/>
                            <br/>

                            Agradecemos a Preferência...<br/>
                        </div> 
                    </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            alert("O bloqueador de pop-ups pode estar impedindo a abertura da nova janela.");
        }

        // Espera um curto período de tempo para garantir que o conteúdo seja carregado na nova janela;
        setTimeout(() => {
            // Aciona a caixa de diálogo de impressão na nova janela;
            newWindow.print();
            // Fecha a nova janela após a impressão;
            newWindow.close();
        }, 1000); // Ajuste o tempo conforme necessário;
    }
    function addtionalItems(items) {
        let result = '';
        console.log(items);
        items.forEach((item) => {
            result += `
                Cód.: ${item.epp_id_product}.<br/>            
                Descrição: ${item.description} - ${item.quantity} ${item.getMeasure()}. (Preço unit/kg R$ ${parseFloat(item.price / item.quantity).toFixed(2)})<br/>
                Subtotal:R$ ${item.price}<br/>
                <br/>
        `});
        return result;
    }
    async function formatAddItems(items) {
        let dataItems = await getDataItems(items);
        let result = [];
        items.forEach((item) => {
            dataItems.forEach(dataItem => {
                if (parseInt(item.epp_id_product) === parseInt(dataItem.CODACESSO)) {
                    item.description = dataItem.DESCREDUZIDA;
                    result.push(item);
                }
            })
        })
        return result;
    }
    async function getDataItems(items) {
        let requests = [];
        let util = new Util();
        items.forEach((item) => requests.push(util.getConsincoProduct(item.epp_id_product)));
        const values = await Promise.all(requests);
        return values;
    }
}