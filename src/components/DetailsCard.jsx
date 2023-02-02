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
}) {
  const history = useHistory();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const clickChange = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{title}</h1>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <div>
        <ul>
          {ingredient.map((ingrediente, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingrediente}
            </li>
          ))}
        </ul>
        {
          pathname.includes('drinks') ? (
            <h2 data-testid="recipe-category">{ `${categoryText} ${alcool}` }</h2>
          ) : (<h2 data-testid="recipe-category">{ `${categoryText}` }</h2>)
        }
      </div>
      <p data-testid="instructions">{instruction}</p>
      <div>
        <Slider { ...settings }>
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
        </Slider>
      </div>
      {
        video
        && (
          <div>
            <iframe
              title="Veja no youtube"
              data-testid="video"
              width="420"
              height="315"
              src={ video }
            />
          </div>
        )
      }
      <div className="startRecipeBtn">
        <button
          type="button"
          id="startRecipeBtn"
          data-testid="start-recipe-btn"
          onClick={ clickChange }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
