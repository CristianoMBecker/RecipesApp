import React, { useState } from 'react';

function SearchBar() {
  const [searchType, setSearchType] = useState('ingredient');

  return (
    <form data-testid="search-bar">
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
        <input type="text" placeholder="Enter search term" data-testid="search-input" />
        <button type="submit" data-testid="exec-search-btn">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
