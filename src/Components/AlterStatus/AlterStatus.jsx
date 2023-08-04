import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Connection } from '../../Util/RestApi';
import ModalAlert from "../Modal/ModalAlert";
import "./AlterStatus.css"

export default function AlterStatus(props) {
    const connection = new Connection();
    const [list, setList] = useState([]);
    const [tempList, setTempList] = useState([]);
    const [modalAttention, setModalAttention] = useState(false);
    const [jAlert, setJAlert] = useState({ type: '', title: '', message: '' });

    useEffect(() => {
        function main() {
            let list = props.list;
            // console.log(list)
            let result = [];
            let value = [];
            list.forEach(item => {
                result.push(JSON.parse(JSON.stringify(item)))
            });
            list.forEach(item => {
                value.push(JSON.parse(JSON.stringify(item)))
            });
            setList([...result]);
            setTempList([...value]);
        }
        main();
    }, [props])

    // useEffect(() => console.log(tempList), [tempList])

    return (
        <div id="divStatusContainer">
            {modalAttention && <ModalAlert jAlert={jAlert} existButton={jAlert.type == 1 ? true : false} closeModalAlert={setModalAttention} />}
            {statusComponent(tempList)}
            <div id="divStatusButtons">
                <button className="btn btn-success" onClick={async () => { await putStatus() }} type="button" title="Salvar alteração" ><FontAwesomeIcon icon="fa-save" /></button>
                <button className="btn btn-danger" onClick={() => { setTempList(copyList(list)) }} type="button" title="Cancelar alteração" ><FontAwesomeIcon icon="fa-undo-alt" /></button>
            </div>
        </div>
    )

    async function showAlert(type, title, message) {
        setJAlert({ type, title, message });
        setModalAttention(true);
        // setTimeout(() => setModalAttention(false), 3000);
    }

    function copyList(list) {
        let newList = [];
        list.forEach(item => {
            newList.push(JSON.parse(JSON.stringify(item)))
        });
        return newList;
    }

    function statusComponent(tBody) {
        return (
            <div id="divStatus">
                <table className="table table-striped">
                    <thead id="tHeadSatus">
                        {<tr className="trHeadStatus">{props.tHead.map((label, index) => <th className="text-center" key={`th_${index}`}>{label}</th>)}</tr>}
                    </thead>
                    <tbody>
                        {bodyStatus(tBody)}
                    </tbody>
                </table>
            </div >
        )
    }

    function bodyStatus(tBody) {
        return (
            tBody.map((row, index) => (
                <tr className="trStatus" key={`status_body_tr_${index}`}>
                    {props.keysTable.map((td, index) => (
                        <td className="tdStatus" key={`td_${row[props.keysTable[1]]}_${index}`}>
                            {
                                td.includes('status') ?
                                    <span id={`spanStatus_${row[props.keysTable[1]]}`} className="spanStatus" value={row[props.keysTable[1]]} onClick={(e) => { statusItem(e, props.keysTable); }}>
                                        {<FontAwesomeIcon onClick={() => { document.querySelector(`#spanStatus_${row[props.keysTable[1]]}`).click() }} icon={row[td] === "1" ? "fa-square-check" : "fa-square"} />}</span>
                                    :
                                    row[td]
                            }
                        </td>
                    ))}
                </tr>
            ))
        )
    }

    function statusItem(e, keys) {
        let value = e.target.getAttribute('value');
        tempList.forEach((item) => {
            if (item[keys[1]] == value) item[keys[0]] = item[keys[0]] == '1' ? '0' : '1';
        });
        setTempList([...tempList]);
    }

    function updateProduct(idProp, descriptionProp, priceProp, categoryProp, measureProp, statusProp) {
        let result = [];
        tempList.forEach(async (item) => {
            const tempItem = list.find((temp) => temp[idProp] === item[idProp]);
            if (tempItem && (tempItem[descriptionProp] !== item[descriptionProp]) || (tempItem[priceProp] !== item[priceProp]) || (tempItem[categoryProp] !== item[categoryProp]) || (tempItem[measureProp] !== item[measureProp]) || (tempItem[statusProp] !== item[statusProp])) {
                result.push({ id_product: item[idProp], description: item[descriptionProp], price: item[priceProp], category: item[categoryProp], measure: item[measureProp], status_prod: item[statusProp] });
            }
        });
        return result;
    }

    function updateMenu(idProp, descriptionProp, statusProp) {
        let result = [];
        tempList.forEach((item) => {
            const tempItem = list.find((temp) => temp[idProp] === item[idProp]);
            if (tempItem && (tempItem[descriptionProp] !== item[descriptionProp]) || (tempItem[statusProp] !== item[statusProp])) {
                result.push({ id_menu: item[idProp], description: item[descriptionProp], status: item[statusProp] });
            }
        });
        return result;
    }

    async function putStatus() {
        try {
            let value = [];
            let valueError = [];
            let valueErrorNew = '';
            let contErr=1;
            let putProduct;
            let putMenu;
            if (props.keysTable.includes('category')) {
                value = updateProduct('id_product', 'description', 'price', 'category', 'measure', 'status_prod');
                for await (let element of value) {
                    console.log(element.description)
                    putProduct = await connection.put(element, "EPP/Product.php", "");
                    console.log(putProduct);
                    props.setList([...tempList]);
                    if (putProduct.error === true){
                        valueErrorNew += `${contErr !== 1 ? '\n' : '' }${contErr}º ${element.description}`;
                        contErr++;
                    }
                }
                if (putProduct.message !== 'Update data success') {
                    showAlert(2, "Erro!", `Ocorreu erro na alteração dos produtos:\n\n${valueErrorNew}`);
                } else {
                    showAlert(0, "Sucesso!", "Status dos produtos alterados com sucesso.");
                }
            } else {
                value = updateMenu('idMenu', 'description', 'status');
                for await (let element of value) {
                    putMenu = await connection.put(element, "EPP/Menu.php", "");
                    console.log(putMenu);
                    props.setList([...tempList]);
                }
                if (putMenu.message !== 'Update data success'){
                    showAlert(2, "Erro!", `Ocorreu erro na alteração dos menus: ${valueError}`);
                } else {
                    showAlert(0, "Sucesso!", "Status dos menus alterados com sucesso.");
                }
            }
        } catch (error) {
            alert(error);
        }
    }

}

