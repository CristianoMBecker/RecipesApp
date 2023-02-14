import React from 'react';
import { Link } from 'react-router-dom';
import drinksIcon from '../imagesFromFigma/drinksIcon.svg';
import foods from '../imagesFromFigma/foods.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinksIcon }
          alt="ícone de bebida"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="meals">
        <img
          src={ foods }
          alt="ícone de comida"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
