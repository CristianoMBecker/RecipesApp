import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('DoneRecipes component', () => {
  it('renders the component', () => {
    renderWithRouter(<DoneRecipes />);
    const img = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    expect(img).toBeInTheDocument();
    const drinkBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    userEvent.click(drinkBtn);
    expect(img).not.toBeInTheDocument();
  });
});
