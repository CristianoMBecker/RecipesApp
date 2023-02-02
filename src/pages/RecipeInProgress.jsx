import React, { useEffect, useState } from 'react';
import IngredientsList from '../components/IngredientsList';
import useFetch from '../hooks/useFetch';
import './RecipeInProgress.css';

function RecipeInProgress({ history }) {
  const { makeFetch, isLoading } = useFetch();
  const [recipeApi, setRecipeApi] = useState([{}]);
  // const { checkedItems, setCheckedItems } = useContext(RecipesContext);
  const { location: { pathname } } = history;

  const id = pathname.split('/')[2];
  const currPathName = pathname.split('/')[1];

  useEffect(() => {
    const fetchRecipe = async () => {
      if (pathname.includes('drinks')) {
        const data = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipeApi(data.drinks);
      } else {
        const data = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipeApi(data.meals);
      }
    };
    fetchRecipe();
  }, []);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgress'));
    if (inProgress) {
      if (!inProgress[currPathName][id]) {
        const newInProgress = {
          ...inProgress,
          [currPathName]: {
            ...inProgress[currPathName],
            [id]: [],
          },
          [currPathName === 'drinks' ? 'meals' : 'drinks']:
           inProgress[[currPathName === 'drinks' ? 'meals' : 'drinks']],
        };
        localStorage.setItem('inProgress', JSON.stringify(newInProgress));
      }
    } else {
      const newInProgress = {
        ...inProgress,
        [currPathName]: {
          [id]: [],
        },
        [currPathName === 'drinks' ? 'meals' : 'drinks']: {},
      };
      localStorage.setItem('inProgress', JSON.stringify(newInProgress));
    }
  }, []);

  const makeIngredients = (recipe) => {
    const ing = (Object.entries(recipe)
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([, value]) => value));

    const measures = (Object.entries(recipe)
      .filter(([key, value]) => key.startsWith('strMeasure') && value)
      .map(([, value]) => value));

    const ingredients = ing.map((item, index) => `${item} ${measures[index]}`);
    return ingredients;
  };

  const ingredients = makeIngredients(recipeApi[0]);

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
      { !isLoading && <IngredientsList
        isLoading={ isLoading }
        ingredients={ ingredients }
        id={ id }
        currPathName={ currPathName }
      />}

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
