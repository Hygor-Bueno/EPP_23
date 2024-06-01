import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DetailsMenu.css';
import CardItems from '../CardItems/CardItems';
import { Connection } from '../../Util/RestApi';

export default function DetailsMenu(props) {
    const [result, setResult] = useState([]);
    const [saleFilter, setSaleFilter] = useState([]);

    useEffect(() => {
        function main() {
            const listSale = props.list;
            const itemsFilter = props.list.filter(item => item.menu.idMenu === props.keyValue);
            const itemsMenu = groupItems(itemsFilter);
            setResult(itemsMenu);
            setSaleFilter(listSale);
            console.log(listSale);
        }
        main();
    }, [props]);

    const renderItem = (item) => (
        <div id="divDetailsContainer">
            <div className='divStyleCod'>
                <div className="rowHeader">Cód.Menu</div>
                <div id='rowCodMenu' className="rowItem">{item.logMenu.pluMenu}</div>
            </div>
            <div className='divStyleCod'>
                <div className="rowHeader">Cód.Prod.</div>
                {item.product.idProduct.map((id, index) => (
                    <div key={index} className="rowItem">{id}</div>
                ))}
            </div>
            <div id='divStyleDescription'>
                <div className="rowHeader">Descrição</div>
                {item.product.description.map((description, index) => (
                    <div key={index} title={description} className="rowItem">{description}</div>
                ))}
            </div>
            <div id='divStyleCategory'>
                <div className="rowHeader">Categoria</div>
                {item.product.category.map((category, index) => (
                    <div key={index} className="rowItem">{category}</div>
                ))}
            </div>
            <div id='divStyleEdit'>
                <div className="rowHeader">Editar</div>
                <div id='rowButton'>
                    <button id="formProdMenu" onClick={() => (props.closeModal(), populateFormProdMenu(item.logMenu.pluMenu), console.log(item.logMenu.pluMenu))}>
                        <FontAwesomeIcon icon={"fa-circle-plus"} />
                    </button>
                </div>
            </div>
        </div>
    );


    function groupItems(items) {
        const groupedItems = [];
        const pluMenusSet = new Set();

        items.forEach(item => {
            if (!pluMenusSet.has(item.logMenu.pluMenu)) {
                pluMenusSet.add(item.logMenu.pluMenu);
                groupedItems.push([item]);
            } else {
                const index = groupedItems.findIndex(group => group[0].logMenu.pluMenu === item.logMenu.pluMenu);
                groupedItems[index].push(item);
            }
        });

        return groupedItems.map(group => {
            if (group.length === 1) {
                return group[0];
            } else {
                const firstItem = group[0];
                const mergedItem = {
                    ...firstItem,
                    product: {
                        ...firstItem.product,
                        idProduct: group.map(item => item.product.idProduct),
                        description: group.map(item => item.product.description),
                        category: group.map(item => item.product.category),
                    },
                    isDuplicate: true,
                };
                return mergedItem;
            }
        });
    }
    /*
        var $eppLogId;
        var $typeBase;
        $this->eppIdMenu = $eppIdMenu;
        $this->eppIdProduct = $eppIdProduct;
        $this->pluMenu = $pluMenu;
    */

    function populateFormProdMenu(prodMenuSale) {
        let putMenuProd = {}
        const selectedProdMenu = saleFilter.filter(prodMenu => prodMenu.logMenu.eppIdMenu === props.keyValue && prodMenu.logMenu.pluMenu === prodMenuSale);
        if (selectedProdMenu.length == 2) {
            let id_menu_product = '';
            selectedProdMenu.forEach((prodMenu, index) => {
                putMenuProd[ prodMenu.logMenu.eppLogId] = prodMenu.logMenu;
                id_menu_product += prodMenu.logMenu.eppLogId;
                if (index === 0) id_menu_product += '-';
                prodMenu.logMenu.typeBase.toUpperCase().includes('RICE') ? props.setRice(prodMenu.logMenu.eppIdProduct) : props.setDessert(prodMenu.logMenu.eppIdProduct)
            })
            props.setIdProdMenu(id_menu_product);
            props.setIdMenu(selectedProdMenu[0].logMenu.eppIdMenu);
            props.setIdSale(selectedProdMenu[0].logMenu.pluMenu);
        }
        props.setPointer(2);
        props.setPutProdMenu(putMenuProd);
        // getLogMenu(prodMenuSale);
    }

    async function getLogMenu(epp_id_menu) {
        let connection = new Connection();
        let req = await connection.get(`&epp_id_menu=${epp_id_menu}`, 'EPP/LogMenu.php');
        console.log(req);
    }

    return (
        <CardItems list={result} renderItem={renderItem} />
    );

}
