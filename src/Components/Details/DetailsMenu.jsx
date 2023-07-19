import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DetailsMenu.css';
import CardItems from '../CardItems/CardItems';

export default function DetailsMenu(props) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        function main() {
            const itemsFilter = props.list.filter(item => item.menu.idMenu === props.keyValue);
            const itemsMenu = groupItems(itemsFilter);
            setResult(itemsMenu);
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
                    <button id="formProdMenu" onClick={() => (props.closeModal(), props.formProdMenu, console.log(props.formProdMenu))}>
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

    return (
        <CardItems list={result} renderItem={renderItem} />
    );

}

{/* <button className="rowDescritpion" onClick={(value) => (populate('prodMenuField', value.idProdMenu))}></button> */}