import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';

describe('DoneRecipeCard', () => {
  let recipesArray;

  beforeEach(() => {
    recipesArray = [
      {
        idDrink: '12345',
        strDrink: 'Drink 1',
        strDrinkThumb: 'drink1.jpg',
        strArea: 'Area 1',
        strCategory: 'Category 1',
        strTags: 'Tag 1, Tag 2',
      },
      {
        idMeal: '54321',
        strMeal: 'Meal 1',
        strMealThumb: 'meal1.jpg',
        strArea: 'Area 2',
        strCategory: 'Category 2',
        strTags: 'Tag 3, Tag 4',
      },
    ];
  });

  it('should redirect the user to the drink route when clicking on the name or image of a drink recipe', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <DoneRecipeCard recipesArray={ recipesArray } filter="all" />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('0-horizontal-name'));
    expect(window.location.pathname).toBe('/drinks/12345');

    fireEvent.click(getByTestId('0-horizontal-image'));
    expect(window.location.pathname).toBe('/drinks/12345');
  });

  it('should redirect the user to the meal route when clicking on the name or image of a meal recipe', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <DoneRecipeCard recipesArray={ recipesArray } filter="all" />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('1-horizontal-name'));
    expect(window.location.pathname).toBe('/meals/54321');

    fireEvent.click(getByTestId('1-horizontal-image'));
    expect(window.location.pathname).toBe('/meals/54321');
  });
});
