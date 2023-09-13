import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Util from '../Util/Util';
export default function PrintOrder(props) {
    return (
        <button type="button" onClick={() => { print() }}><FontAwesomeIcon icon="fa-print" /></button>
    );
    async function print() {
        let additionalItems = props.logSales.filter(item => parseInt(item.menu) === 0);
        let addItems = addtionalItems(await formatAddItems(additionalItems));
        let menuItem = props.logSales.filter(item => parseInt(item.menu) === 1);
        // Cria uma nova janela
        const newWindow = window.open("", "_blank", "width=600,height=400");
        newWindow.document.open();
        newWindow.document.write(`
<pre>
 ENCOMENDA CEIA PEGPESE
 <hr/>
 Loja: ${localStorage.num_store ? localStorage.num_store : 'Não Encontrado'}
 Nº. Documento: ${props.orderCod}
 Cliente: ${props.nameClient}
 Data: ${props.dateOrder}
 Sinal: R$ ${props.signal}
 Pagar: R$ ${props.total - props.signal}
 Total: R$ ${props.total}
 <hr/>
 Menu: ${props.menu}
 Código: ${props.pluMenu}
 Tipo do arroz: ${props.rice}
 Sobremesa: ${props.dessert}
 Subtotal: R$ ${menuItem[0].price}
 <hr/>
 Adicional:
 ${addItems}
 <hr/>
 Observação:
 <hr/>
 Data Entrega: ${props.dateDelivery}
 Horario: ${props.hoursDelivery}
 Loja Entrega: ${props.localDelivery}
 <hr/>
 <strong>Atenção:</strong> Caso não venha retirar sua encomenda até a data reservada, 
 consideraremos a desistência do seu pedido e não haverá estorno do valor.


 __________________________________ 
 Assinatura do Cliente

 __________________________________ 
 Assinatura do Responsável
 

 Agradecemos a Preferência...
</pre>
`);
        newWindow.document.close();

        // Espera um curto período de tempo para garantir que o conteúdo seja carregado na nova janela;
        setTimeout(() => {
            // Aciona a caixa de diálogo de impressão na nova janela;
            // newWindow.print();
            // Fecha a nova janela após a impressão;
            // newWindow.close();
        }, 1000); // Ajuste o tempo conforme necessário;
    }
    function addtionalItems(items) {
        let result = '';
        console.log(items);
        items.forEach( (item) => {
            result += `
Cód.: ${item.epp_id_product}.                
Descrição: ${item.description} - ${item.quantity} ${item.getMeasure()}. (Preço unit/kg R$ ${item.price / item.quantity})
Subtotal:R$ ${item.price}
<br/>
`});
        return result;
        /*
                let util = new Util();
                let logItem = await util.getConsincoProduct(items.epp_id_product);
                console.error(logItem);
                return `
                        Cód.: ${items.epp_id_product}.                
                        Descrição: ${items} - ${items.quantity} ${items}. (Preço unit/kg R$ ${items.price / items.quantity})
                        Subtotal:R$ ${items.price}
                        <br/>
                `
        */
    }
    async function formatAddItems(items) {
        let dataItems = await getDataItems(items);
        let result=[];
        items.forEach((item) =>{
            dataItems.forEach(dataItem => {
                if(item.epp_id_product == dataItem.CODACESSO){
                    item.description = dataItem.DESCREDUZIDA;
                    result.push(item);
                }
            })
        })
        return result;
    }
    async function getDataItems(items){
        let requests = [];
        let util = new Util();
        items.forEach((item) => requests.push(util.getConsincoProduct(item.epp_id_product)));
        const values = await Promise.all(requests);
        return values;
    }
}