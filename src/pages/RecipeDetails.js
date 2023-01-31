import React, { useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';

function RecipeDetails(props) {
  const { history, match: { params: { id } } } = props;
  const [response, setResponse] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const { location: { pathname } } = history;

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      setResponse(dataResponse.meals[0]);
      const dataRecommendation = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recoResponse = await dataRecommendation.json();
      setRecomendations(recoResponse.drinks.slice(0, Number('6')));
    } if (pathname.includes('drinks')) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      setResponse(dataResponse.drinks[0]);
      const dataRecommendation = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recoResponse = await dataRecommendation.json();
      setRecomendations(recoResponse.meals.slice(0, Number('6')));
    }
  };

  const ing = (Object.entries(response)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([, value]) => value));

  const measures = (Object.entries(response)
    .filter(([key, value]) => key.startsWith('strMeasure') && value)
    .map(([, value]) => value));

  const ingredientsAndCups = ing.map((item, index) => `${item} ${measures[index]}`);

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <main>
      <DetailsCard
        title={ pathname.includes('drinks') ? response.strDrink : response.strMeal }
        image={ pathname.includes('drinks') ? response.strDrinkThumb
          : response.strMealThumb }
        ingredient={ ingredientsAndCups }
        instruction={ response.strInstructions }
        categoryText={ response.strCategory }
        video={ response.strYoutube }
        alcool={ pathname.includes('drinks') ? response.strAlcoholic : null }
        recomendations={ recomendations }
        pathname={ pathname }
      />
    </main>
  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
