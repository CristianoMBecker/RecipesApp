import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('renderiza a página de comida e testa se', () => {
  test('ao clicar no ícone renderiza o SearchInput', () => {
    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'test@yahoo.fr');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(enterBtn);

    const iconEl = screen.getByRole('img', { name: /search icon/i });

    userEvent.click(iconEl);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toBeInTheDocument();
  });
});
