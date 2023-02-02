import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import './DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');

  const changeFilter = (filterName) => {
    setFilter(filterName);
  };

  const arrayDeTeste = [
    {
      strTags: 'Pasta, Curry',
      strArea: 'Italian',
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      strAlcoholic: 'Alcoholic',
      strArea: 'Turkish',
      strTags: 'teste1',
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strCategory: 'Ordinary Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  return (
    <div>
      <Header title="Done Recipes" showSearch={ false } />
      <button
        onClick={ () => changeFilter('all') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        onClick={ () => changeFilter('meal') }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        onClick={ () => changeFilter('drink') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <DoneRecipeCard
        recipesArray={ arrayDeTeste }
        filter={ filter }
      />

    </div>
  );
}

export default DoneRecipes;
