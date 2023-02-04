import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
describe('renders the recipes page and ...', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  test('when clicking on the Drinks button, the recipes are filtered', () => {
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>);

    const imageEl = screen.getByTestId('0-horizontal-image');
    expect(imageEl).toBeInTheDocument();
    const imageEl2 = screen.getByTestId('1-horizontal-image');
    expect(imageEl).toBeInTheDocument();

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    fireEvent.click(drinksBtn);

    expect(imageEl).not.toBeInTheDocument();
    expect(imageEl2).toBeInTheDocument();
  });
  test('when clicking on the Meals button, the recipes are filtered', () => {
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>);

    const imageEl = screen.getByTestId('0-horizontal-image');
    expect(imageEl).toBeInTheDocument();
    const imageEl2 = screen.getByTestId('1-horizontal-image');
    expect(imageEl).toBeInTheDocument();

    const mealsBtn = screen.getByRole('button', { name: /meals/i });

    fireEvent.click(mealsBtn);

    expect(imageEl2).not.toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
  });
  test('if when clicking on the share button, the link is copied and the text "Link copied!" pops up', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    fireEvent.click(shareBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});

describe('renders favorite recipes page without information on localStarage and...', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  });
  it('if no comiad is rendered', () => {
    renderWithRouter(
      <RecipesProvider><FavoriteRecipes /></RecipesProvider>,
    );
    const title = screen.getByRole('heading', { name: /favorite recipes/i });

    expect(title).toBeInTheDocument();

    screen.debug();

    expect();
  });
});
