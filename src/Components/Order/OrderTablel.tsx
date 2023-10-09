import React from "react";
import Util from "../../Util/Util";
import { useOrderContext } from "./OrderContext.jsx";


export default function OrderTable() {
    const { listOrder } = useOrderContext();
    const util = new Util();

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID do Produto</th>
                    <th>ID do Pedido</th>
                    <th>Loja</th>
                    <th>Nome do Cliente</th>
                    <th>Loja de Entrega</th>
                    <th>Telefone</th>
                    <th>Data do Pedido</th>
                    <th>Data de Entrega</th>
                    <th>Hora de Entrega</th>
                    <th>Descrição</th>
                    <th>Medida</th>
                    <th>Quantidade</th>
                    <th>Observação</th>
                    <th>Entregue</th>
                </tr>
            </thead>
            <tbody>
                {listOrder.map((order, index) => (
                    <tr key={index}>
                        <td>{order.eppIdProduct}</td>
                        <td>{order.eppIdOrder}</td>
                        <td>{order.store}</td>
                        <td>{order.nameClient}</td>
                        <td>{order.deliveryStore}</td>
                        <td>{order.fone || "-"}</td>
                        <td>{util.convertDateBR(order.dateOrder)}</td>
                        <td>{util.convertDateBR(order.deliveryDate)}</td>
                        <td>{order.deliveryHour}</td>
                        <td>{order.description}</td>
                        <td>{order.measure}</td>
                        <td>{order.quantity}</td>
                        <td>{order.observation || "-"}</td>
                        <td>
                            {order.delivered === 2 ? "Cancelado" : order.delivered === 1 ? "Entregue" : "Pendente"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}
