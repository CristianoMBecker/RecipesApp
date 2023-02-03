import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './IngredientsList.css';
import RecipesContext from '../context/RecipesContext';

function IngredientsList({ ingredients, id, currPathName, isLoading }) {
  const [checkedItems, setCheckedItems] = useState({});

  const { setIsAllChecked } = useContext(RecipesContext);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgress')) || {};
    setCheckedItems(inProgress[currPathName] ? inProgress[currPathName][id] : {});
  }, [isLoading]);

  useEffect(() => {
    if (checkedItems
       && typeof checkedItems === 'object' && Object.keys(checkedItems).length > 0) {
      const values = Object.values(checkedItems);
      if (values.length === ingredients.length) {
        const allIsChecked = values.every((v) => v === true);
        console.log(!allIsChecked);
        setIsAllChecked(!allIsChecked);
      }
    }
  }, [checkedItems]);

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
    const inProgress = JSON.parse(localStorage.getItem('inProgress')) || {};

    const newInProgress = {
      ...inProgress,
      [currPathName]: {
        ...(inProgress[currPathName] || {}),
        [id]: {
          ...(inProgress[currPathName] && (inProgress[currPathName][id] || {})),
          [e.target.name]: e.target.checked,
        },
      },
    };
    localStorage.setItem('inProgress', JSON.stringify(newInProgress));
  };
  return (
    <ul>
      {
        ingredients.map((ingredient, index) => (
          <div key={ `${ingredient}-${index}` }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}-ingredient-step` }
              style={ { textDecoration: checkedItems[`${index}-ingredient-step`]
                ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
            >
              <input
                id={ `${index}-ingredient-step` }
                type="checkbox"
                name={ `${index}-ingredient-step` }
                checked={ checkedItems[`${index}-ingredient-step`] || false }
                onChange={ handleChange }
              />
              {ingredient}
            </label>
          </div>
        ))
      }
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  currPathName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

IngredientsList.defaultProps = {
  isLoading: false,
};

export default IngredientsList;
