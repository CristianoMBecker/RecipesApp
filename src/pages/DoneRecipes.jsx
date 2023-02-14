import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import './DoneRecipes.css';

import AllBtn from '../imagesFromFigma/AllBtn.svg';
import foodsBtn from '../imagesFromFigma/foodsBtn.svg';
import drinksBtn from '../imagesFromFigma/drinksBtn.svg';
import Footer from '../components/Footer';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(doneRecipesLocalStorage);
  }, []);

  const changeFilter = (filterName) => {
    setFilter(filterName);
  };

  return (
    <div className="done-recipe-content">
      <Header title="Done Recipes" showSearch={ false } />
      <section className="filters-content">
        <button
          onClick={ () => changeFilter('all') }
          type="button"
          data-testid="filter-by-all-btn"
        >
          <img src={ AllBtn } alt="all btn" />

        </button>
        <button
          onClick={ () => changeFilter('meal') }
          type="button"
          data-testid="filter-by-meal-btn"
        >
          <img src={ foodsBtn } alt="drinks btn" />

        </button>
        <button
          onClick={ () => changeFilter('drink') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinksBtn } alt="drinks btn" />
        </button>
      </section>

      <main className="cards-Container">
        <DoneRecipeCard
          recipesArray={ doneRecipes }
          filter={ filter }
        />

        <Footer />
      </main>
    </div>
  );
}

export default DoneRecipes;
