import React, { useEffect, useState } from 'react';
import './DetailsMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Connection } from '../../Util/RestApi';

export default function DetailsMenu(props) {
    const connection = new Connection();
    const [listProdMenus, setListProdMenus] = useState([]);

    useEffect(() => {
        async function main() {
            let reqProdMenu = await connection.get(null, 'EPP/LogMenu.php');
            setListProdMenus([...reqProdMenu.data]);
            console.log(reqProdMenu)
        }
        main();
    },[])

    return (
        <div id="divDetailsContainer">
            <div id='divDetailsTable'>
                <table className="table table-striped">
                    <tr class="detailsTable" key={`detail_tr_${props.idProdMenu}`}>
                        <td class="idMenu">{props.idMenu}</td>
                        <td class="descritpionItem">{props.typeBase}</td>
                    </tr>
                </table>
            </div>
            <div id="divDetailsButtons">
                <button className='btn btn-success' type='button' title='Incluir detalhes'><FontAwesomeIcon icon='fa-save' /></button>
                <button className='btn btn-danger' type='button' title='Cancelar inclusão'><FontAwesomeIcon icon='fa-undo-alt' /></button>
            </div>
        </div>
    )
}