import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/SearchBar';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';

const firstLatter = 'first-letter-search-radio';
const searchRadio = 'name-search-radio';
const searchInputItem = 'search-input';
const searchButton = 'exec-search-btn';

const endPoint = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  mealCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  drinkCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  filterCategoriesMeals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  filterCategoriesDrinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
};
describe('Test the searchBar component', () => {
  jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));

  global.alert = jest.fn();

  test('search bar should render 3 radio inputs', () => {
    const { getByTestId } = render(<RecipesProvider><SearchBar /></RecipesProvider>);
    const radioInput1 = getByTestId(firstLatter);
    const radioInput2 = getByTestId(searchRadio);
    const radioInput3 = getByTestId('ingredient-search-radio');

    expect(radioInput1.type).toBe('radio', 'Radio input 1 is not a radio input');
    expect(radioInput2.type).toBe('radio', 'Radio input 2 is not a radio input');
    expect(radioInput3.type).toBe('radio', 'Radio input 3 is not a radio input');
  });

  test('search type state should change when radio button is clicked', () => {
    const { getByTestId } = render(<RecipesProvider><SearchBar pageTypes="meals" /></RecipesProvider>);
    const nameRadio = getByTestId(searchRadio);
    const onChangeMock = jest.fn();
    nameRadio.onchange = onChangeMock;
    fireEvent.click(nameRadio);
    expect(onChangeMock).toHaveBeenCalled();
  });

  test('displays an alert when searching by first letter with more than one character', async () => {
    const { getByTestId } = render(<RecipesProvider><SearchBar pageTypes="drinks" /></RecipesProvider>);
    const firstLetterRadio = getByTestId(firstLatter);
    const searchInput = getByTestId(searchInputItem);
    const execSearchBtn = getByTestId(searchButton);

    fireEvent.click(firstLetterRadio);
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    fireEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('API is called correctly when ingredient search is selected', () => {
    // Create a mock function to simulate the API call
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        meals: [
          { name: 'chicken curry' },
          { name: 'chicken tikka masala' },
        ],
      }),
    });

    // Use the mock function in place of the actual fetch call
    global.fetch = mockFetch;

    // Render the SearchBar component
    const { getByTestId } = render(<RecipesProvider><SearchBar pageType="Meals" /></RecipesProvider>);

    // Select the ingredient search radio button
    const ingredientRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadio);

    // Enter a search term in the input field
    const searchInput = getByTestId(searchInputItem);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    // Click the search button
    const execSearchBtn = getByTestId(searchButton);
    fireEvent.click(execSearchBtn);

    // Assert that the mock fetch function was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  test('API is called correctly when name search is selected', async () => {
    // Create a mock function to simulate the API call
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({ json: () => 'mock json' }),
    );

    // Use the mock function in place of the actual fetch call
    global.fetch = mockFetch;

    // Render the SearchBar component
    const { getByTestId } = render(<RecipesProvider><SearchBar pageType="Meals" /></RecipesProvider>);

    // Select the name search radio button
    const nameRadio = getByTestId(searchRadio);
    fireEvent.click(nameRadio);

    // Enter a search term in the input field
    const searchInput = getByTestId(searchInputItem);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    // Click the search button
    const execSearchBtn = getByTestId(searchButton);
    fireEvent.click(execSearchBtn);

    // Wait for the promise to resolve
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken',
      );
    });
  });
  test('API is called correctly when first letter search is selected', async () => {
    // Create a mock function to simulate the API call

    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({ json: () => 'mock json' }),
    );
    // Use the mock function in place of the actual fetch call
    global.fetch = mockFetch;

    // Render the SearchBar component
    const { getByTestId } = render(<RecipesProvider><SearchBar pageType="Meals" /></RecipesProvider>);

    // Select the first letter search radio button
    const firstLetterRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterRadio);

    // Enter a search term in the input field
    const searchInput = getByTestId(searchInputItem);
    fireEvent.change(searchInput, { target: { value: 'a' } });

    // Click the search button
    const execSearchBtn = getByTestId(searchButton);
    fireEvent.click(execSearchBtn);

    // Assert that the mock fetch function was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
  test('a pesquisa feita a partir de uma tela de drinks', async () => {
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
          json: jest.fn().mockResolvedValue(drinkCategories),
        });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin':
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(ginDrinks),
        });
      default:
        return {};
      }
    });

    window.alert = jest.fn();

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const searchBarIcon = await screen.findByRole('img', {
      name: /search icon/i,
    });

    fireEvent.click(searchBarIcon);

    const searchByName = screen.getByRole('radio', {
      name: /search by name/i,
    });

    fireEvent.click(searchByName);

    expect(searchByName.checked).toBe(true);

    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByTestId(searchButton);

    fireEvent.change(input, { target: { value: 'gin' } });

    fireEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);

    const nameEl = await screen.findByRole('heading', { name: /gin fizz/i });
    expect(nameEl).toBeInTheDocument();
  });
  test('a pesquisa feita a partir de uma tela de drinks', async () => {
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
          json: jest.fn().mockResolvedValue(drinkCategories),
        });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine':
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(oneDrink),
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

    const searchBarIcon = await screen.findByRole('img', {
      name: /search icon/i,
    });

    fireEvent.click(searchBarIcon);

    const searchByName = screen.getByRole('radio', {
      name: /search by name/i,
    });

    fireEvent.click(searchByName);

    expect(searchByName.checked).toBe(true);

    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByTestId(searchButton);

    fireEvent.change(input, { target: { value: 'aquamarine' } });

    fireEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      expect(history.location.pathname).toBe(`/drinks/${oneDrink.drinks[0].idDrink}`);
    });
  });
});
