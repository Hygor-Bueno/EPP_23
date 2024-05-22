import React from 'react';
import Input from '../../Components/Input/Input.jsx';
import Select from '../../Components/Select/Select.jsx';
import {Title} from '../../Components/Title/index.jsx';
import { Flex } from '../../styled.page.jsx';
import styled from 'styled-components';
import { faEdit, faEraser, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button.jsx';

export const RegisterMenu = () => {

  /**Variaveis de controle */
  const [Cod, setCod] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [State, setState] = React.useState('');

  return (
    <React.Fragment>
      <div>
        <Title>Cadastrar Menu</Title>
        <SuperFlex>
          <SubFlex>
            <div className='col-3'>
              <Input name='Codigo' value={Cod} onChange={(e) => setCod(e.target.value)}/>
            </div>
            <div className='col-8'>
              <Input name='Descrição' value={Description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
          </SubFlex>
          <SubFlex>
            <Select children={(
              <React.Fragment>
                <option value="0">Inativo</option>
                <option value="1">Ativo</option>
              </React.Fragment>
            )} name='Status' value={State} onChange={(e) => setState(e.target.value)} />
          </SubFlex>
        </SuperFlex>
        <div className="w-100 d-flex">
          <Button isAnimation={false} iconImage={faPlus} />
          <Button isAnimation={false} iconImage={faEdit} />
          <Button isAnimation={false} iconImage={faTrash} />
          <Button isAnimation={false} iconImage={faEraser} />
        </div>
      </div>
    </React.Fragment>
  )
}

const SubFlex = styled(Flex)`
  justify-content: space-between;
  width: 100%;
`;

const SuperFlex = styled(Flex)`
  flex-wrap: wrap;
`

