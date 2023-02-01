import React from 'react';

function DoneRecipeCard({ recipesArray, filter }) {
  return (
    <>
      {recipesArray.map((item, index) => {
        const arrayTags = item.strTags.split(', ');
        if (filter === 'all'
        || (filter === 'drink' && item.strDrink)
        || (filter === 'meal' && item.strMeal)) {
          return (
            <div key={ index }>
              <p data-testid={ `${index}-horizontal-name` }>
                {item.strDrink || item.strMeal }
              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.strCategory}
              </p>
              <img
                className="recipeImg"
                src={ item.strDrinkThumb || item.strMealThumb }
                alt={ item.strDrink || item.strMeal }
                data-testid={ `${index}-horizontal-image` }
              />
              {
                arrayTags.map((tag) => (
                  <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                    { `${tag}` }
                  </p>
                ))
              }
              <span data-testid={ `${index}-horizontal-done-date` }>
                LUGAR ONDE VAI FICAR A DATA
              </span>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </button>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

DoneRecipeCard.propTypes = {}.isRequired;

export default DoneRecipeCard;
