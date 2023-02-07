import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  console.log(recipesArray);
  const shareLink = (id, buttonId) => {
    copy(`http://localhost:3000/${id}`);
    setClickedButtonId(buttonId);
    setCopyMessage(!copyMessage);
  };

  let filteredArray = [];
  if (filter === 'all') {
    filteredArray = recipesArray;
  } else if (filter === 'drink') {
    filteredArray = recipesArray.filter((item) => item.type === 'drink');
  } else if (filter === 'meal') {
    filteredArray = recipesArray.filter((item) => item.type === 'meal');
  }
  return (
    <>
      {filteredArray.map((item, index) => {
        const arrayTags = item.tags;
        return (
          <div
            className="done-recipes-card"
            key={ index }
          >

            <Link
              to={ `/${item.type}s/${item.id}` }
            >
              <img
                className="recipeImg"
                src={ item.image }
                alt={ item.strDrink || item.strMeal }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="card-text">
              <Link
                to={ `/${item.type}s/${item.id}` }
              >
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { item.name }
                </h2>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${item.nationality} - ${item.category} - ${item.alcoholicOrNot || ''}`}
              </p>

              <span data-testid={ `${index}-horizontal-done-date` }>
                {`Done in: ${item.doneDate.split('T')[0]}`}
              </span>
              {
                arrayTags.map((tag) => (
                  <p
                    className="tag"
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { `${tag}` }
                  </p>
                ))
              }
            </div>
            <button
              onClick={ () => shareLink(`${item.type}s/${item.id}`) }
              type="button"
            >
              <i className="fa-solid fa-share-nodes" />
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
