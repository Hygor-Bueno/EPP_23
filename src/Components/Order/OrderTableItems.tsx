import React, { useEffect, useState } from 'react';
import { useOrderContext } from './OrderContext';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';

interface OrderItem {
    eppIdProduct: number;
    description: string;
    quantity: number;
    menu: boolean;
}

export default function OrderTableItems() {
    const { listOrder } = useOrderContext();
    const [newListItems, setNewListItems] = useState<OrderItem[]>([]);
    const util = new Util();
    //new Intl.NumberFormat('pt-BR').format(numero)
    useEffect(() => {
        function createOrderItems(list: any) {
            const uniqueOrders: Record<number, OrderItem> = {};
            list.forEach((order: any) => {
                const eppIdProduct = parseInt(order.eppIdProduct);
                if (!uniqueOrders[eppIdProduct]) {
                    uniqueOrders[eppIdProduct] = {
                        eppIdProduct,
                        description: order.description,
                        quantity: parseFloat(order.quantity),
                        menu: parseInt(order.menu) === 1 ? true : false,
                    };
                } else {
                    uniqueOrders[eppIdProduct].quantity += parseFloat(order.quantity);
                }
            });
            const orderItems: OrderItem[] = Object.values(uniqueOrders);
            return orderItems;
        }

        async function decomposeMenus(list: OrderItem[]) {
            let result: any = [];
            try {
                let menus = list.filter((item: any) => item.menu);
                let listReq: any = [];
                for await (const item of menus) {
                    let req = await getProductC5(item.eppIdProduct, item.quantity);
                    if (req.error) throw new Error(req.message);
                    listReq.push(req.data);
                }
                result = ([].concat(...listReq));

            } catch (error) {
                console.error(error);
            }
            return result;
        }

        async function getProductC5(eppIdProduct: number, multiplier: number) {
            let result: { error: boolean, data: OrderItem[], message: string } = { error: false, data: [], message: '' };
            try {
                let connection = new Connection();
                let req: any = await connection.get(`&seqproduto=${eppIdProduct}&epp_details=0`, 'EPP/LogSale.php');
                if (req.error) throw new Error(req.message);
                req.data.forEach((element: any) => {
                    let maskItem: OrderItem = {
                        eppIdProduct: parseInt(element.COD_PROD_MAT_PRIMA),
                        description: element.DESCRICAO_MAT_PRIMA,
                        quantity: parseFloat(element.QTDUNIDUTILIZADA) * multiplier,
                        menu: false
                    };
                    result.data.push(maskItem);
                });
            } catch (error) {
                result.error = true;
                result.message = error.toString();
            }
            return result;
        }

        async function initialize() {
            let listItems = createOrderItems(listOrder);
            let items = listItems.filter(item => !item.menu);
            let menus = listItems.filter(item => item.menu);
            let plusItems = await decomposeMenus(menus);
            let fullItems = items.concat(plusItems);
            setNewListItems([...createOrderItems(fullItems)]);
        }
        initialize();

    }, [listOrder]);


    return (
        <div id='orderTableItems' className='d-flex flex-column container'>
            <button type='button' className='btn btn-outline-success my-2 p-1 col-2 text-center' onClick={() => { util.downloadtable(newListItems, 'Itens') }}>Download</button>
            <div>
                <div className='d-flex flex-row'>
                    <div className='col-2 border px-2'><b>Código:</b></div>
                    <div className='col-8 border px-2'><b>Descrição:</b></div>
                    <div className='col-2 border px-2'><b>Quantidade:</b></div>
                </div>
                {newListItems.map(newItem => (
                    <div className='d-flex flex-row' key={`newItem_${newItem.eppIdProduct}`}>
                        <div className='col-2 border px-2'>{newItem.eppIdProduct}</div>
                        <div className='col-8 border px-2'>{newItem.description.toUpperCase()}</div>
                        <div className='col-2 border px-2'>{newItem.quantity.toFixed(3)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}