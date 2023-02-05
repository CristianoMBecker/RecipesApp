import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './DetailsCard.css';
import { useHistory } from 'react-router-dom';

function DetailsCard({
  image,
  title,
  categoryText,
  ingredient,
  instruction,
  video,
  alcool,
  recomendations,
  pathname,
  id,
}) {
  const history = useHistory();

  const inProgressRecipes = {
    drinks: {
      178319: [],
    },
    meals: {
      52771: [],
    },
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const startOrInProgress = () => {
    if (pathname.includes('drinks') && inProgressRecipes.drinks[id]) {
      return 'Continue Recipe';
    } if (pathname.includes('meals') && inProgressRecipes.meals[id]) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

  const clickChange = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <>
      <div
        className="background-image"
        style={ { backgroundImage: `url(${image})` } }
      >
        <div
          className="header-details"
        >
          <nav>
            {
              pathname.includes('drinks') ? (
                <h2 data-testid="recipe-category">{ `${categoryText} ${alcool}` }</h2>
              ) : (<h2 data-testid="recipe-category">{ `${categoryText}` }</h2>)
            }
          </nav>
          <h1 data-testid="recipe-title">{title}</h1>

        </div>
      </div>
      <div className="ingredients-content">
        <h2>Ingredients</h2>
        <ul className="">

          {ingredient.map((ingrediente, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingrediente}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions-content">
        <h2>Instructions</h2>

        <p data-testid="instructions">{instruction}</p>

      </div>
      {
        video
        && (
          <div
            className="video content"
          >
            <iframe
              title="Veja no youtube"
              data-testid="video"
              width="330"
              height="315"
              src={ video }
            />
          </div>
        )
      }

      <div className="slider-content">
        {/* <Slider { ...settings } className="slider">
          {
            pathname.includes('drinks') ? (
              recomendations.map((d, index) => (
                <div key={ d.strMeal } data-testid={ `${index}-recommendation-card` }>
                  <img
                    key={ d.strMeal }
                    className="recomImg"
                    src={ d.strMealThumb }
                    alt={ d.strMeal }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>{ d.strMeal }</p>
                </div>
              ))
            ) : (
              recomendations.map((d, index) => (
                <div key={ d.strDrink } data-testid={ `${index}-recommendation-card` }>
                  <img
                    className="recomImg"
                    src={ d.strDrinkThumb }
                    alt={ d.strDrink }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>{ d.strDrink }</p>
                </div>
              )))
          }
        </Slider> */}
      </div>
      <button
        type="button"
        className="startRecipeBtn"
        data-testid="start-recipe-btn"
        onClick={ clickChange }
      >
        {
          startOrInProgress()
        }
      </button>

    </>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
