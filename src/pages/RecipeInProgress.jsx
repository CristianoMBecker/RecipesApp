import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress({ history }) {
  const { recipeApi, setRecipeApi } = useContext(RecipesContext);
  const { location: { pathname } } = history;
  console.log(pathname.includes('meals'));
  return (
    <div>

      in progress
      <h1 data-testid="recipe-title">

        {pathname.includes('drinks') ? recipeApi.strDrink : recipeApi.strMeal}

      </h1>
      <img
        src={ pathname.includes('drinks')
          ? recipeApi.strDrinkThumb : recipeApi.strMealThumb }
        alt={ pathname.includes('drinks') ? recipeApi.strDrink : recipeApi.strMeal }
        data-testid="recipe-photo"
      />
      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      {
        pathname.includes('drinks') ? (
          <h2
            data-testid="recipe-category"
          >
            { `${recipeApi.strCategory} ${recipeApi.strAlcoholic}` }

          </h2>
        ) : (<h2 data-testid="recipe-category">{recipeApi.strCategory}</h2>)
      }

      <p data-testid="instructions">
        { recipeApi.strInstructions}
      </p>

      <button data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default RecipeInProgress;
