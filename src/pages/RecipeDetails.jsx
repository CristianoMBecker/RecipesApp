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
      <h1>Loading...</h1>
    );
  }

  return (
    <main className="details-card">
      <DetailsCard
        title={ pathname.includes('drinks')
          ? recipeApi.strDrink : recipeApi.strMeal }
        image={ pathname.includes('drinks') ? recipeApi.strDrinkThumb
          : recipeApi.strMealThumb }
        ingredient={ ingredientsAndCups }
        instruction={ recipeApi.strInstructions }
        categoryText={ recipeApi.strCategory }
        video={ recipeApi.strYoutube }
        alcool={ pathname.includes('drinks') ? recipeApi.strAlcoholic : null }
        recomendations={ recomendations }
        pathname={ pathname }
        id={ id }
        recipeApi={ recipeApi }
      />
    </main>
  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
