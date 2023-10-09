import React, { useEffect, useState } from "react";
// import OrderForm from "./OrderForm.tsx";
import OrderTablel from "./OrderTablel.tsx";
import OrderTableItems from "./OrderTableItems.tsx";
import OrderForm from "./OrderForm";
import './Order.css'
import SettingSelectField from "../Forms/Selects/SettingSelectField.ts";
import SelectField from "../Forms/Selects/SelectField.tsx";

import { OrderProvider } from "./OrderContext.jsx";

export default function Order() {
    const [stepTable, setStepTable] = useState(false);
    
    const options = [{ code: '1', name: 'Pedidos' }, { code: '2', name: 'itens' }];
    const selectedTable = new SettingSelectField({ selectValue: '1', label: 'Visuzalização:', options: options });
    selectedTable.containerClass = 'd-flex flex-row align-items-center';
    selectedTable.selectClass = 'm-2';
    selectedTable.clickAction = () => { setStepTable(!stepTable) };

    return (
        <OrderProvider>
            <div id='ordersContainer' className="d-flex flex-row">
                <OrderForm />
                <section className="w-75">
                    <article className="my-2 border-bottom">
                        <SelectField select={selectedTable} />
                    </article>
                    <div>
                        {
                            stepTable ?
                                <OrderTableItems />
                                :
                                <OrderTablel/>
                        }
                    </div>
                </section>
            </div>
        </OrderProvider>
    )
}