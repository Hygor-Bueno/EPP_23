import React, { useContext, useMemo } from 'react';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd';
import { ThemeConnectionContext } from '../../../../../Theme/ThemeConnection';
import { Container, Modal, ModalRequest, Row, Request } from './style';
import P from 'prop-types';

const DisplayOrder = (props) => {
    const { onAction, data, ...rest } = props;
    const {
        findCategoriesByIds,
        setTypeCategory,
        setCodeAddProd,
        setDessert,
        setMenu,
        setRice,
        setTypeBase,
        setPage,
        idMenu
    } = useContext(ThemeRegisterContexts);

    const { menu } = useContext(ThemeConnectionContext);

    const itemMenu = useMemo(() => groupItems(data), [data]);

    function groupItems(items) {
        const groupedItems = new Map();

        items.forEach(item => {
            const key = item.logMenu.pluMenu;

            if (!groupedItems.has(key)) {
                groupedItems.set(key, {
                    ...item,
                    products: [{
                        idLog: item.logMenu.eppLogId,
                        id: item.product.idProduct,
                        description: item.product.description,
                        category: item.product.idCategoryFk,
                        typeBase: item.logMenu.typeBase.toLowerCase()
                    }],
                });
            } else {
                const existingItem = groupedItems.get(key);
                existingItem.products.push({
                    idLog: item.logMenu.eppLogId,
                    id: item.product.idProduct,
                    description: item.product.description,
                    category: item.product.idCategoryFk,
                    typeBase: item.logMenu.typeBase.toLowerCase()
                });
            }
        });

        return Array.from(groupedItems.values()).map(item => {
            return {
                ...item,
                isDuplicate: item.products.length > 1
            };
        });
    }

    const handleRequestClick = (item) => {
        const riceProduct = item.products.find(p => p.typeBase === 'rice');
        const dessertProduct = item.products.find(p => p.typeBase === 'dessert');
        setCodeAddProd(`${item.products[0].idLog}-${item.products[1].idLog}`);
        setMenu(item.logMenu.pluMenu);
        setRice(riceProduct?.id || null);
        setDessert(dessertProduct?.id || null);
        setTypeCategory(item.logMenu.eppIdMenu);
        setTypeBase(item.products);
        setPage(3);
    };


    return (
        <Container {...rest}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Row>
                    <h2>Detalhes do menu</h2>
                </Row>
                <Row>
                    <ModalRequest>
                        {itemMenu.length > 0 && itemMenu.map((item, index) => {
                            const categories = item.products.map(product =>
                                findCategoriesByIds(product.category, menu.data)
                            );

                            return idMenu === item.logMenu.eppIdMenu && (
                                <Request onClick={() => handleRequestClick(item)} key={`menu_${index}`}>
                                    <Row className="container">
                                        <Row className="row">
                                            <Row className="col-2">
                                                <h6>Cód.Menu</h6>
                                                <label>{item.logMenu.pluMenu}</label>
                                            </Row>
                                            <Row className="col-2">
                                                <h6>Cód.Prod</h6>
                                                {item.products.map((product, idx) => (
                                                    <><label key={idx} className='d-block'>{product.id}</label></>
                                                ))}
                                            </Row>
                                            <Row className="col-4">
                                                <h6>Descrição</h6>
                                                {item.products.map((product, idx) => (
                                                    <label key={idx} className='d-block'>{product.description}</label>
                                                ))}
                                            </Row>
                                            <Row className="col-3">
                                                <h6>Categoria</h6>
                                                {categories.map((category, idx) => (
                                                    <label key={idx} className='d-block'>{category}</label>
                                                ))}
                                            </Row>
                                        </Row>
                                    </Row>
                                </Request>
                            );
                        })}
                    </ModalRequest>
                </Row>
            </Modal>
        </Container>
    );
};
DisplayOrder.protoType = {
  onAction: P.func,
  data: P.object,
  rest: P.object,
}


export default DisplayOrder;

