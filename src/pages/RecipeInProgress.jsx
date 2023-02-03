import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import IngredientsList from '../components/IngredientsList';
import useFetch from '../hooks/useFetch';
import './RecipeInProgress.css';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress({ history }) {
  const { isAllChecked } = useContext(RecipesContext);
  const { makeFetch, isLoading } = useFetch();

  const [recipeApi, setRecipeApi] = useState([{}]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const isFavoriteRecipe = favoriteRecipes.some((recipe) => recipe.id
    === recipeApi[0].idDrink
      || recipe.id === recipeApi[0].idMeal);
    setIsFavorite(isFavoriteRecipe);
  }, [recipeApi]);

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

  const saveFavorite = () => {
    const isDrink = currPathName === 'drinks';
    const currId = isDrink ? recipeApi[0].idDrink : recipeApi[0].idMeal;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes.some((recipe) => recipe.id === currId);
    if (!isFavoriteRecipe) {
      const newRecipe = {
        id: currId,
        type: isDrink ? 'drink' : 'meal',
        nationality: !isDrink ? recipeApi[0].strArea : '',
        category: recipeApi[0].strCategory,
        alcoholicOrNot: isDrink ? recipeApi[0].strAlcoholic : '',
        name: isDrink ? recipeApi[0].strDrink : recipeApi[0].strMeal,
        image: isDrink ? recipeApi[0].strDrinkThumb : recipeApi[0].strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newRecipe]));
    } else {
      const newFavorite = favoriteRecipes.filter((recipe) => recipe.id !== currId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };
  console.log(recipeApi[0]);
  const onclick = () => {
    const tags = recipeApi[0].strTags ? recipeApi[0].strTags.split(',') : [];
    const dateNow = new Date().toISOString();
    const isDrink = currPathName === 'drinks';
    const currId = isDrink ? recipeApi[0].idDrink : recipeApi[0].idMeal;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newRecipe = {
      id: currId,
      type: isDrink ? 'drink' : 'meal',
      nationality: !isDrink ? recipeApi[0].strArea : '',
      category: recipeApi[0].strCategory,
      alcoholicOrNot: isDrink ? recipeApi[0].strAlcoholic : '',
      name: isDrink ? recipeApi[0].strDrink : recipeApi[0].strMeal,
      image: isDrink ? recipeApi[0].strDrinkThumb : recipeApi[0].strMealThumb,
      doneDate: dateNow,
      tags,
    };
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));

    history.push('/done-recipes');
  };

  return (
    <div className="recipe-in-progress-content">

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

      <button
        data-testid="share-btn"
        onClick={ () => {
          console.log(`http://localhost:3000/${currPathName}/${id}`);
          copy(`http://localhost:3000/${currPathName}/${id}`);
          setLinkCopied(true);
        } }
      >
        Share

      </button>

      {linkCopied && <p>Link copied!</p>}
      <button
        onClick={ () => {
          saveFavorite();
          setIsFavorite(!isFavorite);
        } }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite
            ? blackHeartIcon : whiteHeartIcon }
          alt="ícone de favoritos"
        />
      </button>
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
      <button
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
        disabled={ isAllChecked }
        onClick={ onclick }
      >
        Finish
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default RecipeInProgress;
