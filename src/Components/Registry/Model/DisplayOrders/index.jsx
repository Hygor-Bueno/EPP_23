import React, { useContext } from 'react';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import { Container, Modal, ModalRequest, Row, Request } from './style';
import P, { any } from 'prop-types';
import { ThemeMenuContext } from '../../../../Theme/ThemeMenu';
import { ThemeLogMenuContext } from '../../../../Theme/ThemeLogMenu';

/**
 * Display Orders é aonde vamos ter varias informações conjuntas de 2 ou mais informações dentro desse componente.
 * @returns
 */
const DisplayOrder = (props) => {
      const {onAction, data, ...rest} = props;

      console.log(data);

      const {
        idMenu,

        Cod, setCod,
        MenuDescription, setMenuDescruiption,
        MenuCod, setMenuCod,
        CodRice, setCodRice,
        Dessert, setDessert,

      } = useContext(ThemeLogMenuContext);

      const {menu, setPage} = useContext(ThemeConnectionContext);
      const itemMenu = groupItems(data);

      const findCategories = (cardIds, categoryData) => {
        const matchingCategory = [];
        [cardIds].forEach(cardId => {
          const category = categoryData.find(cat => cat.id_category === cardId.toString());
          if (category) {
            matchingCategory.push(category.cat_description);
          }
        });

        return matchingCategory;
      }


      function groupItems(items) {
        const groupedItems = new Map();

        items.forEach(item => {
            const key = item.logMenu.pluMenu;
            if (!groupedItems.has(key)) {
                groupedItems.set(key, { ...item, product: { ...item.product, idProduct: [item.product.idProduct], description: [item.product.description], category: [item.product.idCategoryFk] } });
            } else {
                const existingItem = groupedItems.get(key);
                existingItem.product.idProduct.push(item.product.idProduct);
                existingItem.product.description.push(item.product.description);
                existingItem.product.category.push(item.product.idCategoryFk);
            }
        });

        return Array.from(groupedItems.values()).map(item => {
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
                        <h2>Detalhes do menu</h2>
                    </Row>
                    <Row>
                        <ModalRequest>
                            {itemMenu.length > 0 && itemMenu.map((item, index) => {
                              let CATEGORY1 = findCategories(item.product.category[0], menu.data)
                              let CATEGORY2 = findCategories(item.product.category[1], menu.data)

                              return idMenu == item.logMenu.eppIdMenu && (
                                <Request onClick={() => {
                                  // Dados vindo do Tema de Contexto.
                                  setCod(item.logMenu.eppLogId);
                                  setMenuDescruiption(item.logMenu.eppIdMenu);
                                  setMenuCod(item.logMenu.pluMenu);
                                  setCodRice(item.product.idProduct[0]);
                                  setDessert(item.product.idProduct[1]);
                                  setPage(3);
                                }} key={`menu_${index}`}>
                                  <Row className="container">
                                    <Row className="row">
                                      <Row className="col-2">
                                        <h6>Cód.Menu</h6>
                                        <label>{item.logMenu.pluMenu}</label>
                                      </Row>
                                      <Row className="col-2">
                                          <h6>Cód.Prod</h6>
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
                                          <label className='d-block'>{CATEGORY1}</label>
                                          <label className='d-block'>{CATEGORY2}</label>
                                      </Row>
                                    </Row>
                                  </Row>
                              </Request>
                              )
                            })}
                        </ModalRequest>
                    </Row>
                </Modal>
            </Container>
        </React.Fragment>
    )
}

DisplayOrder.propTypes = {
  onAction: P.func, data: any,
}

export default DisplayOrder;
