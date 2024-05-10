import React, { useContext } from 'react';
import {Card} from '../RegisterProd/styled.jsx'
import Input from '../../Input/Input.jsx';
import Select from '../../Select/Select.jsx';
import styled from 'styled-components';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd.jsx';
import {Title} from '../../Title/index.jsx';

export const RegisterMenu = () => {
  const {
    // Function:
    handleCode,
    handleStatus,
    handleDesc,
    handleCodeProd,
    // Variables:
    CodeMenu,
    statusMenu,
    DescriptionMenu,
    codProdMenu,
  } = useContext(ThemeRegisterContexts);

  const ContainerBox = styled.div`
    width: 100%;
    height: 100%;
  `;

  return (
    <React.Fragment>
        <Card>
          <div className='container'>
            <Title>Cadastrar Menu</Title>
            <ContainerBox>
              <div>
                <div className='d-flex justify-content-between'>
                  <Input isReq={true} onChange={handleCode} value={CodeMenu} name="Cód" isDisabled={false} />
                  <Input isReq={true} onChange={handleDesc} name="Descrição" value={DescriptionMenu} />
                  <Select isReq={true} includeInactive={true} value={statusMenu} onChange={handleStatus} name="Status" options={[]} />
                </div>
              </div>
            </ContainerBox>
          </div>
        </Card>

    </React.Fragment>
  )
}



