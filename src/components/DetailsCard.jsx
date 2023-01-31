import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './DetailsCard.css';

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
  const settings = {
    slidesPerRow: 1,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  console.log(recomendations);
  return (
    <div>
      <h1 data-testid="recipe-title">{ title }</h1>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <div>
        <ul>
          {
            ingredient.map((ingrediente, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                { ingrediente }
              </li>

            ))
          }
        </ul>
        <h2 data-testid="recipe-category">{ `${categoryText} ${alcool}` }</h2>
      </div>
      <p data-testid="instructions">
        {instruction}
      </p>
      <div>
        <Slider { ...settings }>
          {
            pathname.includes('drinks') ? (
              recomendations.map((d, index) => (
                <div key={ d } data-testid={ `${index}-recommendation-card` }>
                  <img
                    key={ d.strMeal }
                    className="recomImg"
                    src={ d.strMealThumb }
                    alt={ d.strMeal }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>{ d.strMeal }</p>
                </div>
              ))
            ) : (recomendations.map((d, index) => (
              <>
                <img
                  data-testid={ `${index}-recommendation-card` }
                  key={ d.strDrink }
                  className="recomImg"
                  src={ d.strDrinkThumb }
                  alt={ d.strDrink }
                />
                <p data-testid={ `${index}-recommendation-title` }>{ d.strDrink }</p>
              </>

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
    </div>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
