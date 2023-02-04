import React, { useContext, useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

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

  return (
    <div>
      <Header title="Favorite Recipes" showSearch={ false } />
      <button
        onClick={ getFavorites }
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        onClick={ () => setFavoriteRecipes(favoriteRecipes
          .filter((r) => r.type === 'meal')) }
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        onClick={ () => setFavoriteRecipes(favoriteRecipes
          .filter((r) => r.type === 'drink')) }
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>

      {
        favoriteRecipes.map((recipe, index) => (
          <FavoriteCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            copiedCardIndex={ copiedCardIndex }
            onShareClick={ handleShareClick }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
