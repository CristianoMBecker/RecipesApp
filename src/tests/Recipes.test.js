import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategoris from '../../cypress/mocks/drinkCategories';
import RecipesProvider from '../context/RecipesProvider';
import beefMeals from '../../cypress/mocks/beefMeals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';

const endPoint = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  mealCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  drinkCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  filterCategoriesMeals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  filterCategoriesDrinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
};

describe('test the application', () => {
  it('se a página Recipes é renderizada corretamente com a rota "/meals"', async () => {
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
          json: jest.fn().mockResolvedValue(mealCategories),
        });
      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push('/meals');
    });

    expect(global.fetch).toHaveBeenCalledWith(endPoint.meals);
    expect(global.fetch).toHaveBeenCalledWith(endPoint.mealCategories);
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
      case endPoint.drinks:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinks),
        });
      case endPoint.drinkCategories:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinkCategoris),
        });
      default:
        return {};
      }
    });
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(endPoint.drinks);
    expect(global.fetch).toHaveBeenCalledWith(endPoint.drinkCategories);

    const ordinaryDrinkBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    const cocoaBtn = await screen.findByRole('button', { name: /cocoa/i });

    expect(ordinaryDrinkBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();

    const nameEl = await screen.findByRole('heading', { name: /gg/i });
    const nameEl2 = await screen.findByRole('heading', { name: /gg/i });

    expect(nameEl).toBeInTheDocument();
    expect(nameEl2).toBeInTheDocument();
  });
  test('se ao clicar no botão beef é renderizado as receitas corretas', async () => {
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
          json: jest.fn().mockResolvedValue(mealCategories),
        });
      case `${endPoint.filterCategoriesMeals}${mealCategories.meals[0].strCategory}`:
        return {
          ok: true,
          json: jest.fn().mockResolvedValue(beefMeals),
        };

      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push('/meals');
    });

    const beefBtn = await screen.findByRole('button', { name: /beef/i });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    fireEvent.click(beefBtn);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    const nameEl = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(nameEl).toBeInTheDocument();
  });
  test('se ao clicar no botão Ordinary Drink é renderizado as receitas corretas', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case endPoint.drinks:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinks),
        });
      case endPoint.drinkCategories:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinkCategoris),
        });
      case `${endPoint.filterCategoriesDrinks}${drinkCategoris.drinks[0].strCategory}`:
        return {
          ok: true,
          json: jest.fn().mockResolvedValue(ordinaryDrinks),
        };

      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push('/drinks');
    });

    const ordinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    fireEvent.click(ordinaryBtn);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    const nameEl = await screen.findByRole('heading', { name: /3-mile long island iced tea/i });
    expect(nameEl).toBeInTheDocument();
  });
  test('se ao clicar no botão All toda a lista é renderizada novamente sem filtro', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case endPoint.drinks:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinks),
        });
      case endPoint.drinkCategories:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(drinkCategoris),
        });
      case `${endPoint.filterCategoriesDrinks}${drinkCategoris.drinks[0].strCategory}`:
        return {
          ok: true,
          json: jest.fn().mockResolvedValue(ordinaryDrinks),
        };

      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push('/drinks');
    });

    const ordinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    fireEvent.click(ordinaryBtn);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    const nameEl = await screen.findByRole('heading', { name: /abbey cocktail/i });
    expect(nameEl).toBeInTheDocument();

    const allBtn = await screen.findByRole('button', { name: /all/i });

    fireEvent.click(allBtn);

    expect(global.fetch).toHaveBeenCalledTimes(4);

    waitFor(() => {
      const nameEl2 = screen.queryByRole('heading', { name: /abbey cocktail/i });
      expect(nameEl2).not.toBeInTheDocument();
    });
  });
});
