import React, { useContext, useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';
import RecipesContext from '../context/RecipesContext';

import './RecipeDetails.css';

function RecipeDetails(props) {
  const { history, match: { params: { id } } } = props;
  const [recomendations, setRecomendations] = useState([]);
  const { recipeApi, setRecipeApi } = useContext(RecipesContext);
  const { location: { pathname } } = history;

  const currPathName = pathname.split('/')[1];
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipe = async () => {
    setIsLoading(true);
    if (pathname.includes('meals')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      setRecipeApi(dataResponse.meals[0]);
      const dataRecommendation = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recoResponse = await dataRecommendation.json();
      setRecomendations(recoResponse.drinks.slice(0, Number('6')));
    } if (pathname.includes('drinks')) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      setRecipeApi(dataResponse.drinks[0]);
      const dataRecommendation = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recoResponse = await dataRecommendation.json();
      setRecomendations(recoResponse.meals.slice(0, Number('6')));
    }
    setIsLoading(false);
  };

  const ing = (Object.entries(recipeApi)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([, value]) => value));

  const measures = (Object.entries(recipeApi)
    .filter(([key, value]) => key.startsWith('strMeasure') && value)
    .map(([, value]) => value));

  const ingredientsAndCups = ing.map((item, index) => `${item} ${measures[index]}`);

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <i
          className="fa-solid fa-spinner loading-icon"
        />
      </div>
    );
  }

  return (
    <main className="details-container">
      <DetailsCard
        name={ pathname.includes('drinks')
          ? recipeApi.strDrink : recipeApi.strMeal }
        image={ pathname.includes('drinks') ? recipeApi.strDrinkThumb
          : recipeApi.strMealThumb }
        ingredient={ ingredientsAndCups }
        instruction={ recipeApi.strInstructions }
        category={ recipeApi.strCategory }
        video={ recipeApi.strYoutube }
        alcoholicOrNot={ pathname.includes('drinks') ? recipeApi.strAlcoholic : '' }
        recomendations={ recomendations }
        pathname={ pathname }
        id={ id }
        recipeApi={ recipeApi }
        type={ pathname.includes('drinks')
          ? 'drink' : 'meal' }
        nationality={ recipeApi.strArea ? recipeApi.strArea : null }
      />
    </main>
  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
