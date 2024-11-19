import React, { useContext, useMemo } from 'react';
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

  const findCategories = (cardIds, categoryData) => {
    return cardIds.map(cardId => {
      const category = categoryData.find(cat => cat.id_category === cardId.toString());
      return category ? category.cat_description : 'Categoria não encontrada';
    });
  };

  const groupItems = (items) => {
    return items.reduce((acc, item) => {
      const { pluMenu, typeBase, eppLogId } = item.logMenu;
      const { idProduct, description, idCategoryFk } = item.product;

      if (!acc[pluMenu]) {
        acc[pluMenu] = {
          ...item,
          product: {
            ...item.product,
            idProduct: { id: [idProduct], typebase: [typeBase] },
            description: [description],
            category: [idCategoryFk],
            logId: [eppLogId],
          },
        };
      } else {
        const existingItem = acc[pluMenu];
        existingItem.product.idProduct.id.push(idProduct);
        existingItem.product.idProduct.typebase.push(typeBase);
        existingItem.product.description.push(description);
        existingItem.product.category.push(idCategoryFk);
        existingItem.product.logId.push(eppLogId);
      }

      return acc;
    }, {});
  };

  const itemMenu = useMemo(() => {
    const groupedItems = groupItems(data);
    return Object.values(groupedItems).map((item) => ({
      ...item,
      isDuplicate: item.product.idProduct.id.length > 1,
    }));
  }, [data]);

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
                      setCodRice(item.product.idProduct.id[0]);
                      setDessert(item.product.idProduct.id[1]);
                      setTypeBase(item.product.idProduct.typebase);
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
                          <label className='d-block'>{item.product.idProduct.id[0]}</label>
                          <label className='d-block'>{item.product.idProduct.id[1]}</label>
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
};

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
