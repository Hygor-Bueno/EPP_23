import React, { useState } from 'react';
import { Card, Container } from './styled';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import ResponsiveTable from '../../ViewTable/Table';

export const RegisterProd = () => {
  const [Cod, setCod] = useState('');
  const [Desc, setDesc] = useState('');
  const [Emb, setEmb] = useState('');
  const [Category, setCategory] = useState('');
  const [Status, setStatus] = useState('');

  const options = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
  ];

  const tableData = [
    ['Nome', 'Idade', 'Cidade'],
    ['João', '25', 'São Paulo'],
    ['Maria', '30', 'Rio de Janeiro'],
    ['Carlos', '40', 'Belo Horizonte'],
  ];

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleChangeCod = (e) => {
    setCod(e.target.value);
  };

  const handleChangeEmb = (e) => {
    setEmb(e.target.value);
  }
  
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  }

  return (
    <Container>
      <Card>
        <h3>Cadastrar Produto</h3>
        <div className="d-flex">
          <Input name="Cod" value={Cod} onChange={handleChangeCod} required={true} />
          <Input name="Descrição" value={Desc} onChange={handleChangeDesc} required={true} />
          <Select name="Categoria" value={Category} onChange={handleChangeCategory} options={options} required={true} />
          <Select name="Emb" value={Emb} onChange={handleChangeEmb} options={options} required={true} />
          <Select name="Status" value={Status} onChange={handleChangeStatus} options={options} required={true} />
          <div className='max-box'>
            <ResponsiveTable data={tableData} />
          </div>
        </div>
      </Card>
    </Container>
  )
}
