import React, { useState } from 'react';


const SearchBar = () => {
  const [searchType, setSearchType] = useState('ingredient');

  return (
    <form data-testid="search-bar">
      <div>
        <input 
          type="radio" 
          id="ingredient-search-radio" 
          name="search-type" 
          value="ingredient" 
          checked={searchType === 'ingredient'} 
          onChange={ e => setSearchType(e.target.value) }
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient-search-radio">Search by Ingredient</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="name-search-radio" 
          name="search-type" 
          value="name" 
          checked={searchType === 'name'} 
          onChange={ e => setSearchType(e.target.value) }
          data-testid="name-search-radio"
        />
        <label htmlFor="name-search-radio">Search by Name</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="first-letter-search-radio" 
          name="search-type" 
          value="first-letter" 
          checked={searchType === 'first-letter'} 
          onChange={e => setSearchType(e.target.value)}
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter-search-radio">Search by First Letter</label>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Enter search term" 
          data-testid="search-input" 
        />
        <button type="submit" data-testid="exec-search-btn">Search</button>
      </div>
    </form>
  );
}
