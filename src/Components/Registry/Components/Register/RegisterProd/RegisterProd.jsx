import React, { useContext, useState } from 'react';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import ResponsiveTable from '../../ViewTable/Table';
import { Connection } from '../../../../../Util/RestApi';
import { Card, LimitationBox } from './styled';
import { ThemeRegisterContexts } from '../../../../../Theme/ThemeRegisterProd';

export const RegisterProd = () => {

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
  } = useContext(ThemeRegisterContexts);

  const [headers, setHeaders] = useState(['Loja', 'produto', 'preço']);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const connection = new Connection();

  return (
      <Card>
        <div className="container-fluid">
          <h2>Cadastrar Produto</h2>
          <div className="row justify-content-between mt-4">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <Input
                width={'100%'}
                name="Cod"
                value={codigo}
                type="number"
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
                    options={[]}
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
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <Select
                    name="Status"
                    value={status}
                    onChange={(e) => handleChange(e, setStatus)}
                    options={[]}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <h3>Informações Consinco:</h3>
            <LimitationBox>
              <ResponsiveTable isConsinco={true} data={[]} headers={headers}/>
            </LimitationBox>
          </div>
        </div>
      </Card>
  );
};
