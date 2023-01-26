import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test the searchBar component', () => {
  jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));

  global.alert = jest.fn();

  test('search bar should render 3 radio inputs', () => {
    const { getByTestId } = render(<SearchBar pageType="Meals" />);
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetterRadio = getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
  test('search type state should change when radio button is clicked', () => {
    const { getByTestId } = render(<SearchBar pageType="Meals" />);
    const nameRadio = getByTestId('name-search-radio');
    const onChangeMock = jest.fn();
    nameRadio.onchange = onChangeMock;
    fireEvent.click(nameRadio);
    expect(onChangeMock).toHaveBeenCalled();
  });
  test('displays an alert when searching by first letter with more than one character', async () => {
    const { getByTestId } = render(<SearchBar pageType="Drinks" />);
    const firstLetterRadio = getByTestId('first-letter-search-radio');
    const searchInput = getByTestId('search-input');
    const execSearchBtn = getByTestId('exec-search-btn');

    fireEvent.click(firstLetterRadio);
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    fireEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('should redirect to meal details if only one meal is found', () => {
    // Arrange
    const { getByTestId } = renderWithRouter(<SearchBar />);
    const searchInput = getByTestId('search-input');
    const searchForm = getByTestId('search-bar');

    // Act
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.submit(searchForm);

    // Assert
  });
});
