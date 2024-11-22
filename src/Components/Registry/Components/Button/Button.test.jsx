import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { faCog } from '@fortawesome/free-solid-svg-icons';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);

    // Verifica se o texto está no botão
    const button = screen.getByText(/Click Me/i);
    expect(button).toBeInTheDocument();
  });

  test('calls the onAction function when clicked', () => {
    const mockAction = jest.fn(); // Função simulada
    render(<Button onAction={mockAction}>Click Me</Button>);

    const button = screen.getByText(/Click Me/i);
    fireEvent.click(button); // Simula o clique no botão

    expect(mockAction).toHaveBeenCalled(); // Verifica se a função foi chamada
    expect(mockAction).toHaveBeenCalledTimes(1); // Verifica se foi chamada uma vez
  });

  test('renders with icon and applies animation', () => {
    render(
      <Button iconImage={faCog} animationType="rotate" isAnimation>
        Click Me
      </Button>
    );

    const icon = screen.getByTestId('icon'); // Ajuste para selecionar o ícone (data-testid pode ser necessário)
    expect(icon).toBeInTheDocument();

    const button = screen.getByText(/Click Me/i);
    fireEvent.click(button);

  });
});
