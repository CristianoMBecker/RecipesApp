import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('renderiza a página de comida e testa se', () => {
  test('ao clicar no ícone renderiza o SearchInput', () => {
    renderWithRouter(<Meals />);

    const iconEl = screen.getByRole('img', {
      name: /search icon/i,
    });

    userEvent.click(iconEl);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toBeInTheDocument();
  });
});
