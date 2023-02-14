import React from 'react';
import { Link } from 'react-router-dom';

function CardRecipe({ index, nameItem, image, item }) {
  return (
    <Link
      className="card"
      to={ `/${item.idDrink ? `drinks/${item.idDrink}` : `meals/${item.idMeal}`}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >

        <img
          data-testid={ `${index}-card-img` }
          src={ image }
          alt={ nameItem }
        />

        <h2 data-testid={ `${index}-card-name` }>
          {nameItem}
        </h2>

      </div>
    </Link>
  );
}
CardRecipe.propTypes = {}.isrequired;

export default CardRecipe;
