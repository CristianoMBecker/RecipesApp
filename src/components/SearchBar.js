import React, { useState } from 'react';

function SearchBar({ pageType }) {
  const [searchType, setSearchType] = useState('ingredient');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchTerm.trim();

    if (searchType === 'first-letter' && search.length > 1) {
      global.alert('Sua pesquisa deve ter apenas 1 (um) caractere');
      return;
    }
    const endpoint = endpointMap[pageType][searchType] + search;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      // handle the data here
    } catch (error) {
      // handle the error here
      console.log(error);
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
