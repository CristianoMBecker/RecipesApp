import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header({ title, showSearch }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <Link to="/profile" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="Profile icon" />
      </Link>
      {showSearch && (
        <>
          <button
            onClick={ () => setShowSearchInput(!showSearchInput) }
            data-testid="search-top-btn"
          >
            <img src={ searchIcon } alt="Search icon" />
          </button>
          {showSearchInput && (
            <SearchBar />
          )}
        </>
      )}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {}.isRequired;
