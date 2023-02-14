import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function FavoriteCard({
  recipe, index, copiedCardIndex, onShareClick,
}) {
  const { setFavoriteRecipes } = useContext(RecipesContext);
  const {
    image, type, name, category, nationality, alcoholicOrNot, id,
  } = recipe;

  const removeFavorite = () => {
    const favoriteInLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    const filterFavorites = favoriteInLocalStorage.filter((r) => r.id !== id);
    // if (filterFavorites.length === 0) {
    //   localStorage
    // }
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorites));
    console.log(filterFavorites);
    setFavoriteRecipes(filterFavorites);
  };

  return (
    <div className="done-recipes-card">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="recomImg"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="imagem da receita"
        />
      </Link>
      <div className="card-text">
        <Link
          data-testid={ `${index}-horizontal-name` }
          to={ `/${type}s/${id}` }
        >
          <h2>{name}</h2>
        </Link>
        {type === 'meal'
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </p>
          ) : (
            <h2 data-testid={ `${index}-horizontal-top-text` }>{category}</h2>
          )}
        {
          type === 'drink' && (
            <h2 data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot}
            </h2>
          )
        }
        <div className="buttons-content">
          <button
            onClick={ () => {
              copy(`http://localhost:3000/${type}s/${id}`);
              onShareClick(index);
            } }
          >
            <i className="fa-solid fa-share-nodes" />
          </button>
          {
            index === copiedCardIndex && (
              <p>
                Link copied!
              </p>
            )
          }
          <button
            onClick={ removeFavorite }
          >
            <i className="fa-solid fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  copiedCardIndex: PropTypes.number,
  onShareClick: PropTypes.func.isRequired,
};

FavoriteCard.defaultProps = {
  copiedCardIndex: null,
};

export default FavoriteCard;
