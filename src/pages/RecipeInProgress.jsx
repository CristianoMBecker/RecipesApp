import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import './RecipeInProgress.css';

function RecipeInProgress({ history }) {
  const { makeFetch } = useFetch();
  const [recipeApi, setRecipeApi] = useState([{}]);
  const [checkedItems, setCheckedItems] = useState({});
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  useEffect(() => {
    const fetchRecipe = async () => {
      if (pathname.includes('drinks')) {
        const data = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(data);
        setRecipeApi(data.drinks);
      } else {
        const data = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(data);
        setRecipeApi(data.meals);
      }
    };
    fetchRecipe();
  }, []);
  console.log(recipeApi);
  const ing = (Object.entries(recipeApi[0])
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([, value]) => value));

  const measures = (Object.entries(recipeApi[0])
    .filter(([key, value]) => key.startsWith('strMeasure') && value)
    .map(([, value]) => value));

  const ingredientsAndCups = ing.map((item, index) => `${item} ${measures[index]}`);

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="recipe-in-progress-content">

      in progress
      <h1 data-testid="recipe-title">

        {pathname.includes('drinks') ? recipeApi[0].strDrink : recipeApi[0].strMeal}

      </h1>
      <img
        src={ pathname.includes('drinks')
          ? recipeApi[0].strDrinkThumb : recipeApi[0].strMealThumb }
        alt={ pathname.includes('drinks') ? recipeApi[0].strDrink : recipeApi[0].strMeal }
        data-testid="recipe-photo"
      />
      <ul>
        {
          ingredientsAndCups.map((ingredient, index) => (
            <div key={ `${ingredient}-${index}` }>
              <label
                data-testid="ingredient-step"
                htmlFor={ `${index}-ingredient-step` }
                style={ { textDecoration: checkedItems[`checkbox-${index}`]
                  ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
              >
                <input
                  id={ `${index}-ingredient-step` }
                  type="checkbox"
                  name={ `checkbox-${index}` }
                  checked={ checkedItems[`checkbox-${index}`] || false }
                  onChange={ handleChange }
                />
                {ingredient}
              </label>
            </div>
          ))
        }
      </ul>
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
