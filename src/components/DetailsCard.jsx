import React from 'react';

function DetailsCard({
  image,
  title,
  categoryText,
  ingredient,
  instruction,
  video,
  alcool,
}) {
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
