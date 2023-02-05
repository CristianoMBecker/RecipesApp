import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import recipesAppIcon from '../imagesFromFigma/recipesAppIcon.svg';
import recipesLogo from '../imagesFromFigma/recipesLogo.svg';
import searchIcon from '../imagesFromFigma/searchIcon.svg';
import profileIcon from '../imagesFromFigma/profileIcon.svg';
import foods from '../imagesFromFigma/foods.svg';

function Header({ title, showSearch }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <nav>
        <div className="logo-content-header">
          <img className="recipes-icon" src={ recipesAppIcon } alt="recipes App icon" />
          <img src={ recipesLogo } alt="recipesLogo" />
        </div>
        <div className="nav-content">
          {showSearch && (
            <button
              onClick={ () => setShowSearchInput(!showSearchInput) }
            >
              <img src={ searchIcon } alt="Search icon" data-testid="search-top-btn" />
            </button>

          )}
          <Link
            to="/profile"
          >
            <img
              className="profile-icon"
              src={ profileIcon }
              alt="Profile icon"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
      </nav>
      <img className="foods-icon" src={ foods } alt="foods icon" />
      <h1 data-testid="page-title">{title}</h1>
      {showSearchInput && (
        <SearchBar pageType={ title } />
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {}.isRequired;
