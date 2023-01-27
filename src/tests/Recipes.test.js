import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategoris from '../../cypress/mocks/drinkCategories';

describe('test the application', () => {
  it('if the table renders correctly.', async () => {
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

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const beefBtn = await screen.findByRole('button', { name: /beef/i });
    expect(beefBtn).toBeInTheDocument();
    const goatBtn = screen.getByRole('button', {
      name: /goat/i,
    });
    expect(goatBtn).toBeInTheDocument();

    const nameEl = await screen.findByRole('heading', { name: /corba/i });
    const nameEl2 = await screen.findByRole('heading', { name: /big mac/i });

    expect(nameEl).toBeInTheDocument();
    expect(nameEl2).toBeInTheDocument();
  });
  test('se a página Recipes é renderizada corretamente com a rota "/drinks"', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinks),
        });
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinkCategoris),
        });
      default:
        return {};
      }
    });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    const ordinaryDrinkBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    const cocoaBtn = await screen.findByRole('button', { name: /cocoa/i });

    expect(ordinaryDrinkBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();

    const nameEl = await screen.findByRole('heading', { name: /gg/i });
    const nameEl2 = await screen.findByRole('heading', { name: /gg/i });

    expect(nameEl).toBeInTheDocument();
    expect(nameEl2).toBeInTheDocument();
  });
});
