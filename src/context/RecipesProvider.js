import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeApi, setRecipeApi] = useState([]);

  const values = useMemo(() => ({
    recipes,
    setRecipes,
    recipeApi,
    setRecipeApi,

  }), [recipes, recipeApi]);
  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isrequired;

export default RecipesProvider;
