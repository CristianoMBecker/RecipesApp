import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearch }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="Profile icon" data-testid="profile-top-btn" />
      </Link>
      {showSearch && (
        <>
          <button
            onClick={ () => setShowSearchInput(!showSearchInput) }

          >
            <img src={ searchIcon } alt="Search icon" data-testid="search-top-btn" />
          </button>
          {showSearchInput && (
            <SearchBar pageType={ title } />
          )}
        </>
      )}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {}.isRequired;
