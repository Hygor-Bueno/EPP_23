import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
// import ResponsiveTable from '../../ViewTable/Table';
// import { useWindowSize } from '../../../../../Util/useWindowSize';

export const RegisterProd = () => {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [embalagem, setEmbalagem] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');

  const options = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
  ];

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <Container>
      <Card>
        <div className="container-fluid">
          <h2>Cadastrar Produto</h2>
          <div className="row justify-content-between mt-4">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <Input
                width={'100%'}
                name="Cod"
                value={codigo}
                onChange={(e) => handleChange(e, setCodigo)}
                required={true}
              />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9">
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
                    options={options}
                    required={true}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <Select
                    name="Emb"
                    value={embalagem}
                    onChange={(e) => handleChange(e, setEmbalagem)}
                    options={options}
                    required={true}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <Select
                    name="Status"
                    value={status}
                    onChange={(e) => handleChange(e, setStatus)}
                    options={options}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <h3>Informações Consinco:</h3>
          </div>
        </div>
      </Card>
    </Container>
  );
};

const BackgroundTable = styled.div`
  width: 50vw;
  height: 15vw;
  overflow: auto;
`;

const Container = styled.section`
  width: 50vw;
  height: 100vh;
  background-color: #297073;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  input {
    margin: calc(1.7* var(--spaceDefault)) 0;
  }

  .d-flex {
    margin-top: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1vw;
  }

  .max-box {
    max-width: 600px;
    max-height: 500px;
    background: #cecece13;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  h2 {
    font-size: var(--textSizeL);
  }

  h3 {
    font-size: var(--textSize);
  }

  h5 {
    font-size: var(--textSizeP);
  }
`;

const Card = styled.div`
  overflow: auto;
  width: clamp(200px, 1000vw, 800px);
  height: clamp(200px, 1000vw, 600px);
  
  background-color: white;
  margin: 0 calc(2.6*var(--spaceDefaultL));
  border-radius: var(--borderRadius);
  padding: var(--spaceDefault);

  @media screen and (max-width: 768px) {
    .col-sm-12 {
      margin-bottom: var(--spacing-sm);
    }
  }
`;
