import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';


describe('Input', () => {
  it('deve renderizar ', () => {
    render(<Input />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('deve exibir o nome passado via props', () => {
    render(<Input name='Incluindo texto' />);
    expect(screen.getByText('Incluindo texto')).toBeInTheDocument();
  });

  it('Deve exibir o nome passado via props', () => {
    render(<Input isReq={true} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('Não deve exibir um asterisco `isReq` for falso', () => {
    render(<Input isReq={false} />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('deve desabilitar o campo quando `isDisabled` for verdadeiro', () => {
    render(<Input isDisabled={true} />);
    const input = screen.getByPlaceholderText('');
    expect(input).toBeDisabled();
  });

  it('deve desabilitar o campo quando `isDisabled` for verdadeiro', () => {
    render(<Input isDisabled={true}/>);
    const input = screen.queryAllByDisplayValue();
    expect(input).toBeDisabled();
  });

  it('deve aplicar o placeholder passado como prop', () => {
    render(<Input placeHolder='Digite alguma coisa'/>);
    expect(screen.getByPlaceholderText('Digite alguma coisa')).toBeInTheDocument();
  });

  it('deve chamar a função `onChange` quando o valor do input mudar', () => {
    const handleChange = jest.fn();

    render(
      <Input
        name="teste"
        onChange={handleChange}
      />
    );

    // Localiza o input pelo texto do label
    const input = screen.getByLabelText('teste');

    // Simula a mudança de valor no input
    fireEvent.change(input, { target: { value: 'Novo Valor' } });

    // Verifica se a função handleChange foi chamada
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
