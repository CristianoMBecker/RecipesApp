import { render, cleanup, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import App from '../App';
import RecipeDetails from '../pages/RecipeDetails';
import RecipesContext from '../context/RecipesContext';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

afterEach(cleanup);

const { history } = renderWithRouter(
  <RecipesProvider>
    <App />
  </RecipesProvider>,
);

jest.mock('../context/RecipesContext', () => ({
  useContext: () => ({
    recipeApi: {},
    setRecipeApi: jest.fn(),
  }),
}));

describe('RecipeDetails component', () => {
  it('should have an empty initial state for recommendations', () => {
    const recipeContext = {
      recipeApi: {},
      setRecipeApi: jest.fn(),
    };
    jest.spyOn(RecipesContext, 'useContext').mockImplementation(() => recipeContext);
    const { queryByTestId } = render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );
    expect(queryByTestId('recommendations')).toHaveTextContent('');
  });

  it('should return the correct ingredientsAndCups array', async () => {
    act(() => {
      history.push(`${routes.recipeDetails}/123`);
    });

    const { queryByTestId } = render(
      <RecipesContext.Provider
        value={ {
          recipeApi: {
            strIngredient1: 'ingredient 1',
            strMeasure1: 'measure 1',
            strIngredient2: 'ingredient 2',
            strMeasure2: 'measure 2',
          },
          setRecipeApi: jest.fn(),
        } }
      >
        <RecipeDetails />
      </RecipesContext.Provider>,
    );
    expect(queryByTestId('ingredientsAndCups')).toHaveTextContent('ingredient 1 measure 1 ingredient 2 measure 2');
  });
});
