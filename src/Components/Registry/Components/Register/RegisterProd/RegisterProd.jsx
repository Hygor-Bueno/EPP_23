import React, { useContext, useState, useEffect } from 'react';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import ResponsiveTable from '../../ViewTable/Table';
import { Card, LimitationBox } from './styled';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd';
import { ThemeConnectionContext } from '../../../../../Theme/ThemeConnection';
import {Title, Subtitle} from '../../Title';

export const RegisterProd = () => {

  const {
      menu,
    } = useContext(ThemeConnectionContext);

    const {
      codigo,
      setCodigo,
      descricao,
      setDescricao,
      embalagem,
      setEmbalagem,

      status,
      setStatus,

      categoryFk,
      setCategoryFk,

      refrashList,
      setRefrashList,
    } = useContext(ThemeRegisterContexts);


    const [headers, setHeaders] = useState(['Loja', 'Produto', 'Preço']);

    const handleChange = (e, setter) => {
      setter(e.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
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
          <Title>Cadastrar Produto</Title>
          <div className="row justify-content-between mt-4">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <Input
                id="input-cod"
                width={'100%'}
                isReq={true}
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
                isReq={true}
                isDisabled={true}
                value={descricao}
                onChange={(e) => handleChange(e, setDescricao)}
                required={true}
              />
            </div>
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
                  {/* FOCO AQUI!! */}
                  <Select
                      name="Categoria"
                      value={categoryFk}
                      isReq={true}
                      onChange={(e) => setCategoryFk(e.target.value)}
                      options={menu.data}
                      valueKey="id_category"
                      labelKey="cat_description"
                      required={false}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <Select
                    name="Emb"
                    value={embalagem}
                    isReq={true}
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
                    isReq={true}
                    onChange={(e) => handleChange(e, setStatus)}
                    options={[]}
                    required={true}
                    includeInactive={true}
                  />
                </div>
              </div>
            </div>
            <Subtitle>Informações Consinco:</Subtitle>
            <LimitationBox>
              <ResponsiveTable refrashTable={refrashList} isConsinco={true} data={[]} headers={headers}/>
            </LimitationBox>
          </div>
        </div>
      </Card>
  );
};
