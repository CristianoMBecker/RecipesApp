import React, { useEffect, useState } from 'react';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

function Home({ history }) {
  const [recipes, setRecipes] = useState([]);

  const { location: { pathname } } = history;
  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (pathname === '/meals') {
        const data = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(data.meals);
        console.log(data.meals[0]);
      }

      if (pathname === '/drinks') {
        const data = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipes(data.drinks);
      }
    };

    fetchRecipes();
  }, [pathname]);

  return (
    <div>
      <Header title={ pathname === '/drinks' ? 'Drinks' : 'Meals' } showSearch />
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

Home.propTypes = {}.isrequired;

export default Home;
