import React, { useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';

function RecipeDetails(props) {
  const { history, match: { params: { id } } } = props;
  const [response, setResponse] = useState([]);
  const { location: { pathname } } = history;

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      console.log(dataResponse);
      setResponse(dataResponse);
    } if (pathname.includes('drinks')) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataResponse = await data.json();
      console.log(dataResponse);
      setResponse(dataResponse);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <main>
      <p>{ response.title }</p>
    </main>
  );
}

RecipeDetails.propTypes = {}.isRequired;

export default RecipeDetails;
