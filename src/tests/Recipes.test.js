import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';

describe('test the application', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
  });

  test.only('if the table renders correctly.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'test@yahoo.fr');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(enterBtn);
  });
});
