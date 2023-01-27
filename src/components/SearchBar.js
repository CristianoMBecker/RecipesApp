import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ pageType }) {
  const [searchType, setSearchType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
  const { setRecipes } = useContext(RecipesContext);

  const endpointMap = {
    food: {
      ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      'first-letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
    drink: {
      ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      'first-letter': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    },
  };

  const drinkCondition = (response) => {
    if (response.drinks && response.drinks.length === 1) {
      history.push(`/drinks/${response.drinks[0].idDrink}`);
    } else if (!response.drinks || response.drinks.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes(response.drinks);
    }
  };

  const foodCondition = (response) => {
    if (response.meals && response.meals.length === 1) {
      history.push(`/meals/${response.meals[0].idMeal}`);
    } else if (!response.meals || response.meals.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes(response.meals);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchTerm.trim();
    if (searchType === 'first-letter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      if (pageType === 'Meals') {
        const data = await fetch(endpointMap.food[searchType] + search);
        const response = await data.json();
        foodCondition(response);
      }

      if (pageType === 'Drinks') {
        const data = await fetch(endpointMap.drink[searchType] + search);
        const response = await data.json();
        drinkCondition(response);
      }
    }
  };

  return (
    <form data-testid="search-bar" onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="ingredient-search-radio">
          Search by Ingredient
          <input
            type="radio"
            id="ingredient-search-radio"
            name="search-type"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="ingredient-search-radio"
          />
        </label>
      </div>
      <div>
        <label htmlFor="name-search-radio">
          Search by Name
          <input
            type="radio"
            id="name-search-radio"
            name="search-type"
            value="name"
            checked={ searchType === 'name' }
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="name-search-radio"
          />
        </label>
      </div>
      <div>
        <label htmlFor="first-letter-search-radio">
          Search by First Letter
          <input
            type="radio"
            id="first-letter-search-radio"
            name="search-type"
            value="first-letter"
            checked={ searchType === 'first-letter' }
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Digite o termo de pesquisa"
          data-testid="search-input"
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }
        />
        <button type="submit" data-testid="exec-search-btn">Search</button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {}.isRequired;

export default SearchBar;
