import React, { useContext } from 'react';
import Input from '../../Components/Input/Input.jsx';
import Select from '../../Components/Select/Select.jsx';
import {Title} from '../../Components/Title/index.jsx';
import { Flex } from '../../styled.page.jsx';
import styled from 'styled-components';
import { faEdit, faEraser, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button.jsx';
import { ThemeMenuContext } from '../../../../Theme/ThemeMenu.jsx';
import { Connection } from '../../../../Util/RestApi.js';

export const RegisterMenu = () => {
  const connection = new Connection();

  const {
    Cod, setCod,
    Description, setDescription,
    State, setState,
    setRefrash,
  } = useContext(ThemeMenuContext);

  const post = async () => {
    try {
      const jsonPost = {
        id_menu: Cod,
        status: State,
        description: Description,
      }

      const {error} = await connection.post(jsonPost, "EPP/Menu.php");
      if(!error) {
        console.log('Dado Atualizado!');
        setRefrash(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const update = async () => {
    try {
      const jsonUpdate = {
        id_menu: Cod,
        status: State,
        description: Description,
      }

      const {error} = await connection.put(jsonUpdate, "EPP/Menu.php");
      if(!error) {
        console.log('Dado Atualizado!');
        setRefrash(prev => prev + 1);
      }

    } catch (error) {
      console.log(error);
    }
  }
  const del = async () => {
    try {
      const {error} = await connection.put({id_menu: Cod}, "EPP/Menu.php");
      if(!error) {
        console.log('Registro deletado!');
        setRefrash(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const clear = () => {
    setCod('');
    setDescription('');
    setState('');
    setRefrash(prev => prev + 1);
  }

  return (
    <React.Fragment>
      <SuperFlex>
        <Title>Cadastrar Menu</Title>
        <SubFlex>
          <div className='col-3'>
            <Input isDisabled={true} name='Codigo' value={Cod} onChange={(e) => setCod(e.target.value)}/>
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
      <div className="w-100 d-flex gap-1">
        <Button onAction={() => post()} isAnimation={false} iconImage={faPlus} />
        <Button onAction={() => update()} isAnimation={false} iconImage={faEdit} />
        <Button onAction={() => del()} isAnimation={false} iconImage={faTrash} />
        <Button onAction={() => clear()} isAnimation={false} iconImage={faEraser} />
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

