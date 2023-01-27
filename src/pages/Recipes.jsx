import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

function Recipes({ history }) {
  const { location: { pathname } } = history;
  const { makeFetch } = useFetch();
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async (type) => {
      if (type === 'meals') {
        const data = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(data.meals);
      }
      if (type === 'drinks') {
        const data = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipes(data.drinks);
      }
    };

    const fetchCategories = async (type) => {
      if (type === 'meals') {
        const data = await makeFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setCategories(data.meals);
      }
      if (type === 'drinks') {
        const data = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setCategories(data.drinks);
      }
    };

    if (pathname === '/meals') {
      fetchRecipes('meals');
      fetchCategories('meals');
    }
    if (pathname === '/drinks') {
      fetchRecipes('drinks');
      fetchCategories('drinks');
    }
  }, [pathname]);
  return (
    <div>
      <Header title={ pathname === '/drinks' ? 'Drinks' : 'Meals' } showSearch />
      {
        categories.map(({ strCategory }, index) => {
          if (index > Number('4')) {
            return;
          }
          return (
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory }

            </button>
          );
        })
      }
      {
        recipes.map((recipe, index) => {
          if (index > Number('11')) {
            return;
          }
          const nameItem = recipe.strMeal || recipe.strDrink;
          const image = recipe.strMealThumb || recipe.strDrinkThumb;
          return (
            <CardRecipe
              key={ recipe.idDrink || recipe.idMeal }
              index={ index }
              nameItem={ nameItem }
              image={ image }
              item={ { idDrink: recipe.idDrink, idMeal: recipe.idMeal } }
            />
          );
        })
      }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
