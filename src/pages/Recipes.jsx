import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import './Recipes.css';
import Header from '../components/Header';

import dessert from '../imagesFromFigma/dessert.svg';
import breakfast from '../imagesFromFigma/breakfast.svg';
import chicken from '../imagesFromFigma/chicken.svg';
import goat from '../imagesFromFigma/goat.svg';
import beef from '../imagesFromFigma/beef.svg';
import All from '../imagesFromFigma/All.svg';
import ordinaryDrink from '../imagesFromFigma/ordinaryDrink.svg';
import cocktail from '../imagesFromFigma/cocktail.svg';
import shake from '../imagesFromFigma/shake.svg';
import other from '../imagesFromFigma/other.svg';
import cocoa from '../imagesFromFigma/cocoa.svg';

function Recipes({ history }) {
  const { location: { pathname } } = history;
  const { makeFetch } = useFetch();
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);

  const mealsCategoriesIcons = [beef, breakfast, chicken, dessert, goat];
  const drinksCategoriesIcons = [ordinaryDrink, cocktail, shake, other, cocoa];

  const endPoints = {
    meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  };

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

  useEffect(() => {
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

  const clearFilters = async () => {
    if (pathname === '/meals') {
      fetchRecipes('meals');
    }
    if (pathname === '/drinks') {
      fetchRecipes('drinks');
    }
  };

  const filterByCategory = async (category) => {
    if (!toggle) {
      if (pathname === '/meals') {
        const data = await makeFetch(`${endPoints.meals}${category}`);
        setRecipes(data.meals);
      }
      if (pathname === '/drinks') {
        const data = await makeFetch(`${endPoints.drinks}${category}`);
        setRecipes(data.drinks);
      }
      setToggle(true);
    } else {
      setToggle(false);
      clearFilters();
    }
  };

  return (
    <>
      <Header title={ pathname === '/drinks' ? 'Drinks' : 'Meals' } showSearch />
      <section className="filters-content">
        <button
          data-testid="All-category-filter"
          onClick={ clearFilters }
        >
          <img src={ All } alt="all button" />

        </button>
        {
          categories.map(({ strCategory }, index) => {
            if (index > Number('4')) {
              return;
            }
            return (
              <button
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => filterByCategory(strCategory) }
                name={ strCategory }
              >
                <img
                  src={ pathname === '/drinks' ? drinksCategoriesIcons[index]
                    : mealsCategoriesIcons[index] }
                  alt="category icon"
                />
              </button>
            );
          })
        }
      </section>
      <main className="recipes-content">
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
      </main>
      <Footer />
    </>
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
