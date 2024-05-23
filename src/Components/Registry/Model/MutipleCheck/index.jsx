import React from 'react';
import Button from '../../Components/Button/Button';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons/faArrowRotateBack';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Connection } from '../../../../Util/RestApi';
import { Container, Footer, Header, Modal, StyledTable, TableContainer } from './style';

/** Display Orders é onde vamos poder ativar ou desativar um produto a lita. */
const MutipleCheck = (props) => {
    const { data, ...rest } = props;
    const [listLocal, setListLocal] = React.useState([]);

    React.useEffect(() => {
      restartList(data);
    }, [data]);

    React.useEffect(() =>{},[data,listLocal]);

    const connection = new Connection();

    const handleCheckboxChange = (item) => {
      changeMyList(item);
    };

    const changeMyList = (item)=>{
      const position = listLocal.findIndex((itemLocal)=> itemLocal.id_product == item.id_product);
      listLocal[position].status_prod = listLocal[position].status_prod == 1 ? '0': '1';
      const newList = listLocal;
      setListLocal([...newList]);
    }

    const restartList = (data)=>{
      const tempList = [];
      data.forEach(item => {
        tempList.push({...item});
      });

      setListLocal([...tempList]);
    }

    const handleStatusButtonClick = async () => {
      const tempList = [];

      for (const item of listLocal) {
        await connection.put(item, 'EPP/Product.php');
        tempList.push(item);
      }

      setListLocal([...tempList]);
    };

    return (
        <React.Fragment>
            <Container {...rest}>
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
                                {listLocal?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                onChange={() => handleCheckboxChange(item)}
                                                type="checkbox"
                                                checked={item.status_prod == 1 ? true:false}
                                            />
                                        </td>
                                        <td>{item.id_product}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    </TableContainer>
                    <Footer>
                        <div className='d-flex'>
                            <Button bg="#297073" onAction={handleStatusButtonClick} iconImage={faCircleArrowDown} isAnimation={true} animationType="arrow" />
                            <Button bg="#297073" onAction={() => {setListLocal([]);restartList(data)}} iconImage={faArrowRotateBack} isAnimation={true} animationType="rotate" />
                        </div>
                    </Footer>
                </Modal>
            </Container>
        </React.Fragment>
    )
}



export default MutipleCheck;
