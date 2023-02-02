import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';

const endPoints = {
  drink: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  meal: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};

describe('test if the recipeInProgress page is rendered', () => {
  test('if the fetch drinks is called correctly', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case `${endPoints.drink}178319`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneDrink),
        });
      default:
        return {};
      }
    });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/178319/in-progress');
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${endPoints.drink}178319`);
  });
  test('if the fetch meals is called correctly', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case `${endPoints.meal}52771`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneMeal),
        });
      default:
        return {};
      }
    });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52771/in-progress');
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${endPoints.meal}52771`);
  });
  test('if it is posible to click on the label and checkbox', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case `${endPoints.meal}52771`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneMeal),
        });
      default:
        return {};
      }
    });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52771/in-progress');
    });

    const checkBoxEl = await screen.findByTestId('0-ingredient-step');

    fireEvent.click(checkBoxEl);
    expect(checkBoxEl.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');

    fireEvent.click(checkBoxEl);

    expect(checkBoxEl.style.textDecoration).toBe('none');
  });
});
