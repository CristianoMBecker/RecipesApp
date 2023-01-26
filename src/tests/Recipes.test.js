import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';

describe('test the application', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(meals),
  //   });
  // });

  test.only('if the table renders correctly.', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   ok: 'true',
    //   json: jest.fn().mockResolvedValue(meals),
    // });

    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   ok: 'true',
    //   json: jest.fn().mockResolvedValue(mealCategories),
    // });
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(meals),
        });
      case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(mealCategories),
        });
      default:
        return {};
      }
    });

    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'test@yahoo.fr');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(enterBtn);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefBtn = await screen.findByRole('button', { name: /beef/i });
    expect(beefBtn).toBeInTheDocument();
    const goatBtn = screen.getByRole('button', {
      name: /goat/i,
    });
    expect(goatBtn).toBeInTheDocument();
  });
});
