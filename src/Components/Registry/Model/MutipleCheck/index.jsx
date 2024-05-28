import React from 'react';
import Button from '../../Components/Button/Button';
import { faArrowRotateBack, faCircleArrowDown, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Connection } from '../../../../Util/RestApi';
import { Container, Footer, Header, Modal, StyledTable, TableContainer } from './style';
import P from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Componente ListCheck
 * Exibe uma lista de produtos com opção para ativar ou desativar o status de cada produto.
 */
const ListCheck = (props) => {
    const { data } = props;

    // Estado local para armazenar a lista de produtos
    const [listLocal, setListLocal] = React.useState([]);

    // Efeito para reinicializar a lista quando os dados mudam
    React.useEffect(() => {
        restartList(data);
    }, [data]);

    // Função para reinicializar a lista com os novos dados
    const restartList = (data) => {
        const tempList = data.map(item => ({ ...item }));
        setListLocal(tempList);
    };

    // Função para lidar com a mudança de checkbox
    const handleCheckboxChange = (item) => {
        changeMyList(item);
    };

    // Função para alterar o status de um item na lista
    const changeMyList = (item) => {
        const newList = listLocal.map((itemLocal) => {
            if (itemLocal.id_product === item.id_product) {
                return { ...itemLocal, status_prod: itemLocal.status_prod === '1' ? '0' : '1' };
            }
            return itemLocal;
        });
        setListLocal(newList);
    };

    // Função para lidar com o clique no botão de atualização de status
    const handleStatusButtonClick = async () => {
        const tempList = [];

        for await (const item of listLocal) {
            connection.put(item, 'EPP/Product.php');
            tempList.push(item);
        }

        // Atualizar o estado com a lista atualizada
        setListLocal(tempList);
    };

    // Instância de conexão para chamadas de API
    const connection = new Connection();

    return (
        <Container>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h2>Ative ou Inative o Status do produto</h2>
                </Header>
                <TableContainer>
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
                                            checked={item.status_prod === '1'}
                                        />
                                    </td>
                                    <td>{item.id_product || item.idMenu}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category || (item.status_prod === '0' ? <FontAwesomeIcon icon={faPowerOff} color='#006600' /> : 'Ativo')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </TableContainer>
                <Footer>
                    <div className='d-flex'>
                        <Button bg="#297073" onAction={handleStatusButtonClick} iconImage={faCircleArrowDown} isAnimation={true} animationType="arrow" />
                        <Button bg="#297073" onAction={() => restartList(data)} iconImage={faArrowRotateBack} isAnimation={true} animationType="rotate" />
                    </div>
                </Footer>
            </Modal>
        </Container>
    );
};

// Propriedades esperadas
ListCheck.propTypes = {
    data: P.array,
};

export default ListCheck;
