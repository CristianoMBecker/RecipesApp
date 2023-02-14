import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import recipesAppIcon from '../imagesFromFigma/recipesAppIcon.svg';
import recipesLogo from '../imagesFromFigma/recipesLogo.svg';
import searchIcon from '../imagesFromFigma/searchIcon.svg';
import profileIcon from '../imagesFromFigma/profileIcon.svg';
import foods from '../imagesFromFigma/foods.svg';
import drinksIcon from '../imagesFromFigma/drinksIcon.svg';
import doneIcon from '../imagesFromFigma/doneIcon.svg';
import favoriteIcon from '../imagesFromFigma/favoriteIcon.svg';
import profileIconYellow from '../imagesFromFigma/profileIconYellow.svg';

function Header({ title, showSearch }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  let pageIcon;

  switch (title) {
  case 'Meals':
    pageIcon = foods;
    break;
  case 'Drinks':
    pageIcon = drinksIcon;
    break;
  case 'Favorite Recipes':
    pageIcon = favoriteIcon;
    break;
  case 'Profile':
    pageIcon = profileIconYellow;
    break;
  case 'Done Recipes':
    pageIcon = doneIcon;
    break;
  default:
    break;
  }

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
      <img
        className="page-icon"
        src={ pageIcon }
        alt="foods icon"
      />
      <h1 data-testid="page-title">{title}</h1>
      {showSearchInput && (
        <SearchBar pageType={ title } />
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {}.isRequired;
