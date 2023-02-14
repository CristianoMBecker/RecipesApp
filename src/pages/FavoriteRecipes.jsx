import React, { useContext, useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

import AllBtn from '../imagesFromFigma/AllBtn.svg';
import foodsBtn from '../imagesFromFigma/foodsBtn.svg';
import drinksBtn from '../imagesFromFigma/drinksBtn.svg';
import Footer from '../components/Footer';

import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const [copiedCardIndex, setCopiedCardIndex] = useState(null);

  const getFavorites = () => {
    const favoritesInLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));

    setFavoriteRecipes(favoritesInLocalStorage || []);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleShareClick = (index) => {
    setCopiedCardIndex(index);
  };
  console.log(favoriteRecipes);
  return (
    <div className="done-recipe-content">
      <Header title="Favorite Recipes" showSearch={ false } />
      <section className="filters-content">
        <button
          onClick={ getFavorites }
          data-testid="filter-by-all-btn"
        >
          <img src={ AllBtn } alt="all btn" />

        </button>
        <button
          onClick={ () => setFavoriteRecipes(favoriteRecipes
            .filter((r) => r.type === 'meal')) }
          data-testid="filter-by-meal-btn"
        >
          <img src={ foodsBtn } alt="foods btn" />

        </button>
        <button
          onClick={ () => setFavoriteRecipes(favoriteRecipes
            .filter((r) => r.type === 'drink')) }
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinksBtn } alt="drinks Btn" />

        </button>
      </section>
      <main className="cards-Container">
        { favoriteRecipes.length === 0 ? <h2>No favorite recipes found!</h2>
          : favoriteRecipes.map((recipe, index) => (
            <FavoriteCard
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              copiedCardIndex={ copiedCardIndex }
              onShareClick={ handleShareClick }
            />
          ))}
      </main>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
