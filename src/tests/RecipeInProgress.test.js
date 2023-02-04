import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipesProvider from '../context/RecipesProvider';

const endPoints = {
  drink: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  meal: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};

const routes = {
  oneDrink: '/drinks/178319/in-progress',
  oneMeal: '/meals/52771/in-progress',
};

const whiteHeartIcon = 'whiteHeartIcon.svg';
const blackHeartIcon = 'blackHeartIcon.svg';

describe('test if the recipeInProgress page is rendered', () => {
  afterEach(() => {
    localStorage.clear();
  });

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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${endPoints.meal}52771`);
  });
  test('if it is possible to click on the label and on the checkbox and the page when reloaded renders with the markup made', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const checkBoxEl = await screen.findByTestId('0-ingredient-step');

    fireEvent.click(checkBoxEl);
    expect(checkBoxEl.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');

    fireEvent.click(checkBoxEl);

    expect(checkBoxEl.style.textDecoration).toBe('none');
  });
  test('tests if the finish button is enabled on the meal page', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const finishBtn = await screen.findByRole('button', { name: /finish/i });

    expect(finishBtn.disabled).toBe(true);

    const allCheckBox = await screen.findAllByRole('checkbox');

    allCheckBox.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(finishBtn.disabled).toBe(false);
  });
  test('if the finish button is disabled, in the case of drink recipes', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
    });
    const finishBtn = await screen.findByRole('button', { name: /finish/i });

    expect(finishBtn.disabled).toBe(true);
    const allCheckBox = await screen.findAllByRole('checkbox');

    allCheckBox.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(finishBtn.disabled).toBe(false);
  });
  test('if when clicking on the share button the text "link copied" is displayed', async () => {
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

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const shareBtn = screen.getByRole('img', { name: /ícone de compartilhamento/i });

    fireEvent.click(shareBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');

    const copiedText = await screen.findByText(/Link Copied/i);

    expect(copiedText).toBeInTheDocument();
  });
  test('test if clicking on the favorite icon changes color', async () => {
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

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const favoriteIcon = await screen.findByRole('img', { name: /ícone de favoritos/i });
    expect(favoriteIcon).toHaveAttribute('src', whiteHeartIcon);

    fireEvent.click(favoriteIcon);

    expect(favoriteIcon).toHaveAttribute('src', blackHeartIcon);

    act(() => {
      history.push('/');
    });

    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push(routes.oneMeal);
    });

    const favoriteIcon2 = await screen.findByRole('img', { name: /ícone de favoritos/i });
    expect(favoriteIcon2).toHaveAttribute('src', blackHeartIcon);
  });

  test('tests if it is possible to remove a recipe from favorites', async () => {
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

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const favoriteIcon = await screen.findByRole('img', { name: /ícone de favoritos/i });
    expect(favoriteIcon).toHaveAttribute('src', whiteHeartIcon);

    fireEvent.click(favoriteIcon);

    expect(favoriteIcon).toHaveAttribute('src', blackHeartIcon);

    fireEvent.click(favoriteIcon);

    expect(favoriteIcon).toHaveAttribute('src', whiteHeartIcon);
  });
  test('tests if clicking on the finish button is directed to the route "/done/recipes"', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
    });

    const finishBtn = await screen.findByRole('button', { name: /finish/i });

    expect(finishBtn.disabled).toBe(true);

    const checkboxEls = await screen.findAllByRole('checkbox');

    expect(checkboxEls).toHaveLength(3);

    checkboxEls.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(finishBtn.disabled).toBe(false);

    fireEvent.click(finishBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('tests whether when checking a checkbox and leaving and then returning on the same page the checkboxes remain checked', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
    });

    const checkboxEls = await screen.findAllByRole('checkbox');

    checkboxEls.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    act(() => {
      history.push('/');
    });

    const enterBtn = screen.getByRole('button', { name: /enter/i });

    expect(enterBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push(routes.oneDrink);
    });

    expect(history.location.pathname).toBe(routes.oneDrink);

    const checkboxEls2 = await screen.findAllByRole('checkbox');

    checkboxEls2.forEach((checkbox) => {
      expect(checkbox.checked).toBe(true);
    });
  });
  test('if localStorage is called when rendering the page', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case `${endPoints.drink}178319`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneDrink),
        });
      case `${endPoints.meal}52771`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneMeal),
        });
      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
    });

    const ingredient0 = await screen.findByText('Hpnotiq 2 oz');
    expect(ingredient0).toBeInTheDocument();
    const checkBoxeEls = await screen.findAllByRole('checkbox');
    expect(checkBoxeEls[0].checked).toBe(false);
    fireEvent.click(checkBoxeEls[0]);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    act(() => {
      history.push('/');
    });
    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push(routes.oneMeal);
    });
    expect(history.location.pathname).toBe(routes.oneMeal);
  });
  test('if localStorage is called when rendering the page', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      switch (url) {
      case `${endPoints.drink}178319`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneDrink),
        });
      case `${endPoints.meal}52771`:
        return Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue(oneMeal),
        });
      default:
        return {};
      }
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const checkBoxeEls = await screen.findAllByRole('checkbox');
    expect(checkBoxeEls[0].checked).toBe(false);
    fireEvent.click(checkBoxeEls[0]);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    act(() => {
      history.push('/');
    });
    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push(routes.oneDrink);
    });
    expect(history.location.pathname).toBe(routes.oneDrink);
  });
  test('tests if clicking on the finish button is directed to the route "/done/recipes"', async () => {
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
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneMeal);
    });

    const finishBtn = await screen.findByRole('button', { name: /finish/i });

    expect(finishBtn.disabled).toBe(true);

    const checkboxEls = await screen.findAllByRole('checkbox');

    expect(checkboxEls).toHaveLength(8);

    checkboxEls.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(finishBtn.disabled).toBe(false);

    fireEvent.click(finishBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('test if clicking on the favorite icon changes color', async () => {
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

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);

    act(() => {
      history.push(routes.oneDrink);
    });

    const favoriteIcon = await screen.findByRole('img', { name: /ícone de favoritos/i });
    expect(favoriteIcon).toHaveAttribute('src', whiteHeartIcon);

    fireEvent.click(favoriteIcon);

    expect(favoriteIcon).toHaveAttribute('src', blackHeartIcon);

    act(() => {
      history.push('/');
    });

    expect(history.location.pathname).toBe('/');

    act(() => {
      history.push(routes.oneDrink);
    });

    const favoriteIcon2 = await screen.findByRole('img', { name: /ícone de favoritos/i });
    expect(favoriteIcon2).toHaveAttribute('src', blackHeartIcon);
  });
});
