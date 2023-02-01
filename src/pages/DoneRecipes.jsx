import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import './DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');

  const changeFilter = (filterName) => {
    console.log(filterName);
    setFilter(filterName);
  };

  const arrayDeTeste = [
    {
      strTags: 'Pasta, Curry',
      strArea: 'Italian',
      idMeal: '52977',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      strAlcoholic: 'Alcoholic',
      strArea: 'Turkish',
      strTags: 'teste1',
      idDrink: '15997',
      strDrink: 'GG',
      strCategory: 'Ordinary Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
    {
      strArea: 'Turkish',
      strTags: 'teste1',
      idDrink: '17222',
      strDrink: 'A1',
      strCategory: 'Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    },
    {
      strArea: 'Turkish',
      strTags: 'test2',
      idMeal: '53060',
      strMeal: 'Burek',
      strCategory: 'Side',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
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
