import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ recipesArray, filter }) {
  const [copyMessage, setCopyMessage] = useState(false);
  const [clickedButtonId, setClickedButtonId] = useState(null);
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

  const shareLink = (id, buttonId) => {
    copy(`http://localhost:3000/${id}`);
    setClickedButtonId(buttonId);
    setCopyMessage(!copyMessage);
  };

  let filteredArray = [];
  if (filter === 'all') {
    filteredArray = recipesArray;
  } else if (filter === 'drink') {
    filteredArray = recipesArray.filter((item) => item.idDrink);
  } else if (filter === 'meal') {
    filteredArray = recipesArray.filter((item) => item.idMeal);
  }
  return (
    <>
      {filteredArray.map((item, index) => {
        const arrayTags = item.strTags ? item.strTags.split(', ') : [];
        return (
          <div key={ index }>
            <Link
              to={ item.idDrink ? `/drinks/${item.idDrink}` : `/meals/${item.idMeal}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                {item.strDrink || item.strMeal }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${item.strArea} - ${item.strCategory} ${item.strAlcoholic || ''}`}
            </p>
            <Link
              to={ item.idDrink ? `/drinks/${item.idDrink}` : `/meals/${item.idMeal}` }
            >
              <img
                className="recipeImg"
                src={ item.strDrinkThumb || item.strMealThumb }
                alt={ item.strDrink || item.strMeal }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            {
              arrayTags.map((tag) => (
                <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  { `${tag}` }
                </p>
              ))
            }
            <span data-testid={ `${index}-horizontal-done-date` }>
              23/06/2020
            </span>
            <button
              onClick={ () => shareLink(item.idMeal
                ? `meals/${item.idMeal}` : `drinks/${item.idDrink}`, index) }
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
              {
                (clickedButtonId === index && copyMessage && 'Link copied!')
              }
            </button>
          </div>
        );
      })}
    </>
  );
}

DoneRecipeCard.propTypes = {}.isRequired;

export default DoneRecipeCard;
