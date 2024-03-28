import React, { useContext, useState, useEffect } from 'react';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import ResponsiveTable from '../../ViewTable/Table';
import { Card, LimitationBox } from './styled';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd';
import { ThemeConnectionContext } from '../../../../../Theme/ThemeConnection';

export const RegisterProd = () => {

  const {
      category,
    } = useContext(ThemeConnectionContext);

    const {
      codigo,
      setCodigo,
      descricao,
      setDescricao,
      embalagem,
      setEmbalagem,
      categoria,
      setCategoria,
      status,
      setStatus,

      refrashList,
      setRefrashList,
      
    } = useContext(ThemeRegisterContexts);

    const [headers, setHeaders] = useState(['Loja', 'Produto', 'Preço']);

    const handleChange = (e, setter) => {
      setter(e.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.keyCode === 13) { // Verifica se a tecla pressionada é Enter
        setRefrashList(prev => !prev);
      }
    };


  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [codigo]);

  return (
      <Card>
        <div className="container-fluid">
          <h2>Cadastrar Produto</h2>
          <div className="row justify-content-between mt-4">
            <div className="col-lg-4 col-md-12 col-sm-12">


              {/* Aqui tenho que ver alguma forma de colocar o KeyDown junto com o value */}
              <Input
                id="input-cod"
                width={'100%'}
                name="Cod"
                value={codigo}
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => handleChange(e, setCodigo)}
                required={true}
              />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <Input
                width={'100%'}
                name="Descrição"
                value={descricao}
                onChange={(e) => handleChange(e, setDescricao)}
                required={true}
              />
            </div>
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
                  <Select
                      name="Categoria"
                      value={categoria}
                      onChange={(e) => handleChange(e, setCategoria)}
                      options={category.data}
                      valueKey="id_category"
                      labelKey="cat_description"
                      required={true}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <Select
                    name="Emb"
                    value={embalagem}
                    onChange={(e) => handleChange(e, setEmbalagem)}
                    options={[]}
                    required={true}
                    includeEmb={true}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <Select
                    name="Status"
                    value={status}
                    onChange={(e) => handleChange(e, setStatus)}
                    options={[]}
                    required={true}
                    includeInactive={true}
                  />
                  {/* <button type='button' onClick={() => setA(prev => !prev)}>Atualizar</button> */}
                </div>
              </div>
            </div>
            <h3>Informações Consinco:</h3>
            <LimitationBox>
              <ResponsiveTable refrashTable={refrashList} isConsinco={true} data={[]} headers={headers}/>
            </LimitationBox>
          </div>
        </div>
      </Card>
  );
};
