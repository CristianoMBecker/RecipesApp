import React from 'react';
import { Link } from 'react-router-dom';

function CardRecipe({ index, nameItem, image, item }) {
  return (
    <Link
      className="card"
      to={ `/${item.idDrink ? 'bebidas' : 'comidas'}/${item.idDrink || item.idMeal}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <div className="card-image-container">
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt={ nameItem }
          />
        </div>
        <div className="cardTitle-container">
          <h2 data-testid={ `${index}-card-name` }>
            {nameItem}
          </h2>
        </div>
      </div>
    </Link>
  );
}
CardRecipe.propTypes = {}.isrequired;

export default CardRecipe;
