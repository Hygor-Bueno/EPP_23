import React, { useContext, useMemo } from 'react';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import { Col, Container, Modal, ModalRequest, Request, Row, RowTwo } from './style';
import { ThemeLogMenuContext } from '../../../../Theme/ThemeLogMenu';

const DisplayOrder = (props) => {
  const { onAction, data, ...rest } = props;
  const {
    idMenu,
    setCod,
    setMenuDescruiption,
    setMenuCod,
    setCodRice,
    setDessert,
    setTypeBase,
  } = useContext(ThemeLogMenuContext);

  const { menu, setPage } = useContext(ThemeConnectionContext);

  // Função para combinar itens pelo pluMenu
  const combineItemsByPluMenu = (items) => {
    const grouped = {};

    items.forEach((item) => {
      const { pluMenu, typeBase, eppLogId, eppIdMenu } = item.logMenu;
      const { description, idCategoryFk, idProduct } = item.product;
      const { idMenu } = item.menu;

      // Inicializa o grupo para idMenu se não existir
      if (!grouped[idMenu]) {
        grouped[idMenu] = { id: idMenu, data: [] };
      }

      // Procura uma entrada existente para o pluMenu
      let existingEntry = grouped[idMenu].data.find((entry) => entry.idPluMenu === pluMenu);

      if (!existingEntry) {
        // Cria nova entrada para este pluMenu
        existingEntry = { ...item.menu, idPluMenu: pluMenu, items: [] };
        grouped[idMenu].data.push(existingEntry);
      }

      // Adiciona os dados do tipo base ao array items
      existingEntry.items.push({
        typeBase,
        idLog: eppLogId,
        description,
        category_fk: idCategoryFk,
        product: idProduct,
      });
    });

    // Retorna os valores agrupados
    return Object.values(grouped);
  };

  // Memoização dos dados agrupados
  const groupedData = useMemo(() => combineItemsByPluMenu(data), [data]);

  // Função para encontrar o item correspondente ao idMenu
  const fieldMenu = (element) => {
    const matched = groupedData.find((group) => group.id === element);
    return matched ? matched.id : null;
  };

  const valueMenu = fieldMenu(idMenu);

  return (
    <React.Fragment>
  <Container onClick={onAction} {...rest}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <Row>
        <h2>Detalhes do Menu</h2>
      </Row>
      <Row>
        <ModalRequest>
          {idMenu === valueMenu ? (
            <div>
              {groupedData.map((item) => {
                if (item.id === valueMenu) {
                  return (
                    <div key={item.id}>
                      {item.data.map((group) => (
                        <Request onClick={() => {

                          let cod;
                          setMenuDescruiption(group.idMenu);
                          setMenuCod(group.idPluMenu);
                          setTypeBase(group.typeBase);

                          // Aqui faço uma sepação para conseguir recuperar um valor pelo callback do useState e conseguir renderizar para cada input verificando seu tipo.
                          group.items.map((item,index) => {
                            if(index == 0){
                              cod = item.idLog;
                            }else{
                              cod = `${cod}-${item.idLog}`
                            }

                            if(item.typeBase.toLowerCase() === "rice") {
                              setCodRice(item.product);
                            }
                            else if(item.typeBase.toLowerCase() === "dessert") {
                              setDessert(item.product)
                            }
                            else console.error('error');
                          })

                          setCod(cod);
                          setPage(3);
                          props.setOpenDetails(false);
                        }} key={group.idPluMenu}>
                          <div>
                            <Col col={12} sm={6} md={4} lg={3} xl={2}>
                              <strong>Numero do cartão: </strong>{group.idPluMenu}
                            </Col>
                            <Col>
                              {group.items.map((subitem, index) => (
                                <Col>
                                  <RowTwo col={6} sm={6} md={4} lg={3} xl={2} key={`${group.idPluMenu}-${index}`}>
                                    <strong className='gap-1'>{subitem.typeBase.toLowerCase() == "rice" ? "Arroz:" : "Sobremessa:"} </strong>
                                    <div>{subitem.description} - <strong>{subitem.product}</strong></div>
                                  </RowTwo>
                                </Col>
                              ))}
                            </Col>
                          </div>
                        </Request>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div>Deu errado!</div>
          )}
        </ModalRequest>
      </Row>
    </Modal>
  </Container>
</React.Fragment>

  );
};

  // DisplayOrder.propTypes = {
  //   onAction: PropTypes.func.isRequired,
  //   data: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       logMenu: PropTypes.shape({
  //         pluMenu: PropTypes.string.isRequired,
  //         typeBase: PropTypes.string.isRequired,
  //         eppLogId: PropTypes.string.isRequired,
  //         eppIdMenu: PropTypes.string.isRequired,
  //       }).isRequired,
  //       product: PropTypes.shape({
  //         idProduct: PropTypes.string.isRequired,
  //         description: PropTypes.string.isRequired,
  //         idCategoryFk: PropTypes.string.isRequired,
  //       }).isRequired,
  //       menu: PropTypes.shape({
  //         idMenu: PropTypes.string.isRequired,
  //       }).isRequired,
  //     })
  //   ).isRequired,
  // };

export default DisplayOrder;
