import React, { useContext } from 'react';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import { Container, Modal, ModalRequest, Row, Request } from './style';
import PropTypes from 'prop-types';
import { ThemeLogMenuContext } from '../../../../Theme/ThemeLogMenu';

/**
 * DisplayOrder é onde vamos ter várias informações conjuntas de 2 ou mais informações dentro desse componente.
 * @returns
 */
const DisplayOrder = ({ onAction, data, ...rest }) => {
  const {
    idMenu,
    setCod,
    setMenuDescruiption,
    setMenuCod,
    setCodRice,
    setDessert,
    setTypeBase,

    setDataLog,
  } = useContext(ThemeLogMenuContext);

    const { menu, setPage } = useContext(ThemeConnectionContext);
    const itemMenu = groupItems(data);

    const findCategories = (cardIds, categoryData) => {
        return cardIds.map(cardId => {
            const category = categoryData.find(cat => cat.id_category === cardId.toString());
            return category ? category.cat_description : 'Categoria não encontrada';
        });
    };

    function groupItems(items) {
        const groupedItems = new Map();

        items.forEach((item) => {
            const key = item.logMenu.pluMenu;
            if (!groupedItems.has(key)) {
                groupedItems.set(key, {
                    ...item,
                    product: {
                        ...item.product,
                        idProduct: [item.product.idProduct],
                        description: [item.product.description],
                        category: [item.product.idCategoryFk],
                        typebase: [item.logMenu.typeBase],
                        logId: [item.logMenu.eppLogId],
                    },
                });
            } else {
                const existingItem = groupedItems.get(key);
                existingItem.product.idProduct.push(item.product.idProduct);
                existingItem.product.description.push(item.product.description);
                existingItem.product.category.push(item.product.idCategoryFk);
                existingItem.product.typebase.push(item.logMenu.typeBase);
                existingItem.product.logId.push(item.logMenu.eppLogId);
            }
        });

        return Array.from(groupedItems.values()).map((item) => {
            if (item.product.idProduct.length === 1) {
                return item;
            } else {
                return { ...item, isDuplicate: true };
            }
        });
    }

    return (
        <React.Fragment>
            <Container onClick={onAction} {...rest}>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <Row>
                        <h2>Detalhes do Menu</h2>
                    </Row>
                    <Row>
                        <ModalRequest>
                            {itemMenu.length > 0 && itemMenu.map((item, index) => {
                                const categories = findCategories(item.product.category, menu.data);

                                const jsonObj = JSON.stringify(item.product);
                                localStorage.setItem("product", jsonObj);

                                return idMenu === item.logMenu.eppIdMenu && (
                                    <Request
                                        onClick={() => {
                                            setCod(`${item.product.logId[0]}-${item.product.logId[1]}`);
                                            setMenuDescruiption(item.logMenu.eppIdMenu);
                                            setMenuCod(item.logMenu.pluMenu);
                                            setCodRice(item.product.idProduct[0]);
                                            setDessert(item.product.idProduct[1]);
                                            setTypeBase(item.product.typebase);
                                            setDataLog(item.product);
                                            setPage(3);
                                        }}
                                        key={`menu_${index}`}
                                    >
                                        <Row className="container">
                                            <Row className="row">
                                                <Row className="col-2">
                                                    <h6>Cód. Menu</h6>
                                                    <label>{item.logMenu.pluMenu}</label>
                                                </Row>
                                                <Row className="col-2">
                                                    <h6>Cód. Prod</h6>
                                                    <label className='d-block'>{item.product.idProduct[0]}</label>
                                                    <label className='d-block'>{item.product.idProduct[1]}</label>
                                                </Row>
                                                <Row className="col-4">
                                                    <h6>Descrição</h6>
                                                    <label className='d-block'>{item.product.description[0]}</label>
                                                    <label className='d-block'>{item.product.description[1]}</label>
                                                </Row>
                                                <Row className="col-3">
                                                    <h6>Categoria</h6>
                                                    <label className='d-block'>{categories[0]}</label>
                                                    <label className='d-block'>{categories[1]}</label>
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
        </React.Fragment>
    );
}

DisplayOrder.propTypes = {
    onAction: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        logMenu: PropTypes.shape({
            pluMenu: PropTypes.string.isRequired,
            typeBase: PropTypes.string.isRequired,
            eppLogId: PropTypes.string.isRequired,
            eppIdMenu: PropTypes.string.isRequired,
        }).isRequired,
        product: PropTypes.shape({
            idProduct: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            idCategoryFk: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
};

export default DisplayOrder;
