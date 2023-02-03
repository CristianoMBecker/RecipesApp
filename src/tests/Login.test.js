import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import meals from '../../cypress/mocks/oneMeal';
import mealsCategories from '../../cypress/mocks/mealCategories';

const passwordInputDataTestId = 'password-input';

const endPoint = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  mealCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  drinkCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  filterCategoriesMeals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  filterCategoriesDrinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
};

describe('renderiza o login e testa se...', () => {
  test('if the email input exists', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
  });

  test('if the password input exists', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveProperty('type', 'password');
  });

  test('if the enter button exists and if it is disabled', () => {
    renderWithRouter(<App />);
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toHaveProperty('type', 'button');
    expect(enterBtn).toBeDisabled();
  });

  test('whether the button becomes enabled when the correct values of the inputs ​are entered', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'test@yahoo.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterBtn.disabled).toBe(false);
  });

  test('if the application is redirected to the meals page when clicking the enter button', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case endPoint.meals:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(meals),
        });
      case endPoint.mealCategories:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(mealsCategories),
        });
      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(enterBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'test@yahoo.fr');
    expect(emailInput.value).toBe('test@yahoo.fr');

    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toBe('1234567');

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/meals');
  });
  test('if the localStorage function is called', () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case endPoint.meals:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(meals),
        });
      case endPoint.mealCategories:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(mealsCategories),
        });
      default:
        return {};
      }
    });

    const email = 'test@test.com';
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterBtn);
    setLocalStorage('user', 'test@test.com');
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(email));
  });
});
