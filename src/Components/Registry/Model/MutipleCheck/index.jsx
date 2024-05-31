import React from 'react';
import Button from '../../Components/Button/Button';
import { faArrowRotateBack, faCircleArrowDown, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Connection } from '../../../../Util/RestApi';
import { Container, Footer, Header, Modal, StyledTable, TableContainer } from './style';
import P from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';

const ListCheck = (props) => {
    const { table, ...rest } = props;

  /**
   * Componente ListCheck
   * Exibe uma lista de produtos com opção para ativar ou desativar o status de cada produto.
   */
  const connection = new Connection();

  const searchProd = async () => {
    try {
      const result = await connection.get('&registration=1','EPP/Product.php');
      return result.data || [];
    } catch (error) {
      console.log(error);
    }
  };

  const searchCategory = async () => {
    try {
      const result = await connection.get(`&registration=1`, 'EPP/Menu.php')
      return result.data || [];
    } catch (error) {
      console.log(error);
    }
  }

  // Estado local para armazenar a lista de produtos
  const [listLocal, setListLocal] = React.useState([]);
  const [dataCheck, setDataCheck] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const {setListCheckAll} = React.useContext(ThemeConnectionContext);

    const fetchData = async () => {
      setLoading(true);
      const data = !table ? await searchProd() || [] : await searchCategory() || [];
      setDataCheck(data);
      setLoading(false);
    };

    React.useEffect(() => {
      fetchData();
    }, []);

    // Efeito para reinicializar a lista quando os dados mudam
    React.useEffect(() => {
        restartList(dataCheck);
    }, [dataCheck]);

    // Função para reinicializar a lista com os novos dados
    const restartList = (data) => {
        const tempList = data.map(item => ({ ...item }));
        setListLocal(tempList);
    };

    // Função para lidar com a mudança de checkbox
    const handleCheckboxChange = (item) => {
        !table ? changeMyList(item) : changeMyListCategory(item);
    };

    // Função para alterar o status de um item na lista
    const changeMyList = (item) => {
        const newList = listLocal.map((itemLocal) => {
            console.log(itemLocal, item);
            if (itemLocal.id_product === item.id_product) {
                return { ...itemLocal, status_prod: itemLocal.status_prod === '1' ? '0' : '1' };
            }
            return itemLocal;
        });
        setListLocal(newList);
    };

    const changeMyListCategory = (item) => {
      const newList = listLocal.map((itemLocal) => {
        console.log(item, itemLocal);
          if (itemLocal.idMenu === item.idMenu) {
              return { ...itemLocal, status: itemLocal.status === '1' ? '0' : '1' };
          }
          return itemLocal;
      });
      setListLocal(newList);
  };

    // Função para lidar com o clique no botão de atualização de status
    const handleStatusButtonClick = async () => {
        const tempList = [];

        for await (const item of listLocal) {
            !table ? connection.put(item, 'EPP/Product.php') :
            connection.put({
              id_menu: item.idMenu,
              description: item.description,
              status: item.status
            }, 'EPP/Menu.php');
            tempList.push(item);
        }

        // Atualizar o estado com a lista atualizada
        setListLocal(tempList);
    };

    return (
        <Container {...rest}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h2>Ative ou Inative o Status do produto</h2>
                </Header>
                <TableContainer>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <StyledTable>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Código</th>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLocal.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                onChange={() => handleCheckboxChange(item)}
                                                type="checkbox"
                                                checked={!table ? item.status_prod === '1' : item.status === '1'}
                                            />
                                        </td>
                                        <td>{item.id_product || item.idMenu}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category || (item.status_prod === '0' ? <FontAwesomeIcon icon={faPowerOff} color='#006600' /> : <FontAwesomeIcon icon={faPowerOff} color='#b90000' />)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    )}
                </TableContainer>
                <Footer>
                    <div className='d-flex'>
                        <Button bg="#297073" onAction={() => { handleStatusButtonClick(); setListCheckAll(false); }} iconImage={faCircleArrowDown} isAnimation={true} animationType="arrow" />
                        <Button bg="#297073" onAction={() => restartList(dataCheck)} iconImage={faArrowRotateBack} isAnimation={true} animationType="rotate" />
                    </div>
                </Footer>
            </Modal>
        </Container>
    );
};

ListCheck.propTypes = {
    data: P.array,
};

export default ListCheck;
