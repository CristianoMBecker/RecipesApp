import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('DoneRecipes component', () => {
  it('renders the component', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByText(/italian - vegetarian/i);
    expect(title).toBeInTheDocument();
    userEvent.click(title);
    expect(window.location.href).toBe('http://localhost/');
  });
  it('should test the filter', async () => {
    renderWithRouter(<DoneRecipes />);
    const title2 = screen.getByText(/spicy arrabiata penne/i);
    expect(title2).toBeInTheDocument();
    const drinkBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    userEvent.click(drinkBtn);
    expect(title2.value).not.toBe(/spicy arrabiata penne/i);
    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });
    userEvent.click(mealsBtn);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
  });
});
