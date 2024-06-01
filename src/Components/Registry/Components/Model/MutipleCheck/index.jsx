import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBack, faCircleArrowDown, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';
import { Connection } from '../../../../../Util/RestApi';
import { Container, Footer, Header, Modal, StyledTable, TableContainer } from './style';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd';
import { ThemeConnectionContext } from '../../../../../Theme/ThemeConnection';

const MultipleCheck = ({ dataHeaders, data, ...rest }) => {
    const [listLocal, setListLocal] = useState([]);
    const {setRefreshFlag} = useContext(ThemeConnectionContext);
    const {
      setInteractive,
      setIsMutipleCheck,
    } = useContext(ThemeRegisterContexts);

    useEffect(() => {
        if (data) {
            setListLocal(data.map(item => ({ ...item })));
        }
    }, [data]);

    const connection = new Connection();

    const handleCheckboxChange = (id, type) => {
        const updatedList = [...listLocal];
        for (const item of updatedList) {
            if (item.id_product === id || item.idMenu === id) {
                item[type] = item[type] === '1' ? '0' : '1';
                break;
            }
        }
        setListLocal(updatedList);
    };

    const handleStatusButtonClick = async () => {
        const updatedList = [];
        for (const item of listLocal) {
            if (item.id_product){
              await connection.put(item, 'EPP/Product.php');
            }
            if (item.idMenu){
              await connection.put({
                id_menu: item.idMenu,
                status: item.status,
                description: item.description,
              }, 'EPP/Menu.php');
            }
            updatedList.push(item);
        }
        setListLocal(updatedList);
    };

    return (
        <Container {...rest}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h2>Ative ou Inative o Status do produto</h2>
                </Header>
                <TableContainer>
                    <StyledTable>
                        <thead>
                            <tr>
                                {dataHeaders?.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {listLocal?.map((item, index) => (
                                <tr key={item.id_product || item.idMenu || index}>
                                    <td>
                                        {item.status_prod !== undefined && (
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(item.id_product, 'status_prod')}
                                                checked={item.status_prod === '1'}
                                            />
                                        )}
                                        {item.status !== undefined && (
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(item.idMenu, 'status')}
                                                checked={item.status === '1'}
                                            />
                                        )}
                                    </td>
                                    <td>{item.id_product || item.idMenu}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.category || (
                                            <FontAwesomeIcon
                                                icon={faPowerOff}
                                                color={item.status === '1' ? '#199f22' : '#f90000'}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </TableContainer>
                <Footer>
                    <div className="d-flex">
                        <Button
                            bg="#297073"
                            onAction={() => {
                              handleStatusButtonClick();
                              setRefreshFlag(prev=> !prev);
                              setInteractive(prev => !prev);
                              setIsMutipleCheck(prev=>!prev);
                            }}
                            iconImage={faCircleArrowDown}
                            isAnimation={true}
                            animationType="arrow"
                        />
                        <Button
                            bg="#297073"
                            onAction={() => setListLocal(data.map(item => ({ ...item })))}
                            iconImage={faArrowRotateBack}
                            isAnimation={true}
                            animationType="rotate"
                        />
                    </div>
                </Footer>
            </Modal>
        </Container>
    );
};

MultipleCheck.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultipleCheck;
