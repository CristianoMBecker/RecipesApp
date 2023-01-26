import React, { useEffect, useState } from 'react';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

function Recipes({ history }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const { location: { pathname } } = history;
  const { makeFetch } = useFetch();

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

      <section className="categories-content">
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
                { strCategory }

              </button>
            );
          })
        }
      </section>
      {
        recipes.map((recipe, index) => {
          if (index > Number('11')) {
            return;
          }
          return (
            <CardRecipe key={ index } />
          );
        })
      }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {}.isrequired;

export default Recipes;
