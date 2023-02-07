import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './DetailsCard.css';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DetailsCard({
  image,
  name,
  category,
  ingredient,
  instruction,
  video,
  alcoholicOrNot,
  recomendations,
  pathname,
  id,
  nationality,
  type,
}) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const [copyMessage, setCopyMessage] = useState(false);

  function saveRecipe(recipe) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newRecipe = {
      id: recipe.id,
      type: recipe.type,
      nationality: recipe.nationality || '',
      category: recipe.category || '',
      alcoholicOrNot: recipe.alcoholicOrNot || '',
      name: recipe.name,
      image: recipe.image,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard successfully!');
      },
      (error) => {
        console.error('Could not copy text: ', error);
      },
    );
  };

  const history = useHistory();

  const shareLink = (idd) => {
    copy(`http://localhost:3000/${idd}`);
    setCopyMessage(!copyMessage);
  };

  const inProgressRecipes = {
    drinks: {
      178319: [],
    },
    meals: {
      52771: [],
    },
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
    <div>
      <h1 data-testid="recipe-title">{name}</h1>
      <img src={ image } alt={ name } data-testid="recipe-photo" />
      <button
        data-testid="share-btn"
        onClick={ () => shareLink(pathname.includes('meals')
          ? `meals/${id}` : `drinks/${id}`) }
        type="button"
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
        />
        {
          (copyMessage && 'Link copied!')
        }
      </button>
      <button
        type="button"
        onClick={ () => saveRecipe({
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        }) }
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
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
        {pathname.includes('drinks') ? (
          <h2 data-testid="recipe-category">{`${category} ${alcoholicOrNot}`}</h2>
        ) : (
          <h2 data-testid="recipe-category">{`${category}`}</h2>
        )}
      </div>
      <p data-testid="instructions">{instruction}</p>
      <div>
        <Slider { ...settings }>
          {pathname.includes('drinks')
            ? recomendations.map((d, index) => (
              <div
                key={ d.strMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  key={ d.strMeal }
                  className="recomImg"
                  src={ d.strMealThumb }
                  alt={ d.strMeal }
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {d.strMeal}
                </p>
              </div>
            ))
            : recomendations.map((d, index) => (
              <div
                key={ d.strDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="recomImg"
                  src={ d.strDrinkThumb }
                  alt={ d.strDrink }
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {d.strDrink}
                </p>
              </div>
            ))}
        </Slider>
      </div>
      {video && (
        <div>
          <iframe
            title="Veja no youtube"
            data-testid="video"
            width="420"
            height="315"
            src={ video }
          />
        </div>
      )}
      <div className="startRecipeBtn">
        <button
          type="button"
          id="startRecipeBtn"
          data-testid="start-recipe-btn"
          onClick={ clickChange }
        >
          {
            startOrInProgress()
          }
        </button>
      </div>
    </div>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
