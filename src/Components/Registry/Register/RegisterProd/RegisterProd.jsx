import React, { useContext, useState } from 'react';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import ConsincoTable from '../../ViewTable/Consinco';
import { Flex } from '../../styled.page';
import { Title } from '../../Components/Title';
import Button from '../../Components/Button/Button.jsx';
import { faEdit, faEraser, faPen, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeRegisterProdContext } from '../../../../Theme/ThemeRegister.jsx';
import { Connection } from '../../../../Util/RestApi.js';

export const RegisterProd = () => {
  const {menu} = useContext(ThemeConnectionContext);
  const connection = new Connection();

  /**Variaveis de estados */
  const {
    Cod, setCod,
    Description, setDescription,
    Category, setCategory,
    Emb, setEmb,
    Status, setStatus,
    refrash, setRefrash,
  } = useContext(ThemeRegisterProdContext);


  /**A onde posso fazer a pesquisa pelo teclado */
  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      setRefrash(prev => prev + 1);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [Cod])

  const post = async () => {
    try {
      const jsonPost = {
        id_product: Cod,
        description: Description,
        price: "0",
        status_prod: Status,
        measure: Emb,
        id_category_fk: Category,
      }

      const {error} = await connection.post(jsonPost, "EPP/Product.php");
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
        id_product: Cod,
        description: Description,
        price: "0",
        status_prod: Status,
        measure: Emb,
        id_category_fk: Category,
      }

      const {error} = await connection.put(jsonUpdate, "EPP/Product.php");
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
      const {error} = await connection.put({id_product: Cod}, "EPP/Product.php");
      if(!error) {
        console.log('Registro deletado!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const clear = () => {
    setCod('');
    setDescription('');
    setCategory('');
    setEmb('');
    setStatus('');
    setRefrash(prev => prev + 1);
  }

  return (
    <React.Fragment>
      <div>
        <Title>Adicionar Produto</Title>
        <Flex>
          <div className="col-2"><Input value={Cod} onChange={(e) => setCod(e.target.value)} name="Cod." /></div>
          <div className="col-9"><Input value={Description} onChange={(e) => setDescription(e.target.value)} name="Descrição" isDisabled={true} /></div>
        </Flex>
        <Flex>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                {menu.data?.map(({id_category, cat_description}) => {
                  return <option key={`option_${id_category}`} value={id_category}>{cat_description}</option>
                })}
              </React.Fragment>
            )} value={Category} onChange={(e) => setCategory(e.target.value)} name="Categoria" />
          </div>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                <option value="Kg">Kg</option>
                <option value="Un">Un</option>
              </React.Fragment>
            )} value={Emb} onChange={(e) => setEmb(e.target.value)} name="Emb" />
          </div>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                <option value="0">Inativo</option>
                <option value="1">Ativo</option>
              </React.Fragment>
            )} value={Status} onChange={(e) => setStatus(e.target.value)} name="Status" />
          </div>
        </Flex>
      </div>
      <div>
        <label className="label">Informações consinco:</label>
        <ConsincoTable idProd={Cod} refrashList={refrash} setDescription={setDescription}/>
      </div>
      <div className="w-100 d-flex gap-1 pt-2">
        <Button onAction={() => post()} isAnimation={false} iconImage={faPlus} />
        <Button onAction={() => update()} isAnimation={false} iconImage={faPencil} />
        <Button onAction={() => del()} isAnimation={false} iconImage={faTrash} />
        <Button onAction={() => clear()} isAnimation={false} iconImage={faEraser} />
      </div>
    </React.Fragment>
  );
};
