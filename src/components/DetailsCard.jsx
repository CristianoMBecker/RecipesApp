import React from 'react';

function DetailsCard({ image, title, categoryText, ingredient, instruction, video }) {
  return (
    <div>
      <h2 data-testid="recipe-title">{title}</h2>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <div>
        <p data-testid="recipe-category">{categoryText}</p>
        <ul>
          {
            ingredient.filter((item, index) => (
              <li>{item === `strIngredient${index + 1}`.length > 0}</li>
            ))
          }
        </ul>
        <ul>
          {
            instruction.filter((item, index) => (
              <li>{item === `strInstructions${index + 1}`.length > 0}</li>
            ))
          }
        </ul>
      </div>
      {
        video && <span><a data-testid="video" href={ video }>Veja no youtube</a></span>
      }
    </div>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
