import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const values = useMemo(() => ({
    recipes,
    setRecipes,

  }), [recipes, filteredRecipes]);
  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isrequired;

export default RecipesProvider;
