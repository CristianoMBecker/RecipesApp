import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

const emailObj = { email: 'email@qualquer.com' };

describe('renders profile page without any email in localStorage and....', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays the text "user email not found"', () => {
    renderWithRouter(<Profile />);

    const emailEl = screen.getByTestId('profile-email');
    expect(emailEl).toBeInTheDocument();
    expect(emailEl).toHaveTextContent(/user email not found/);
  });
});

describe('renders the profile page and...', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(emailObj));
  });
  test('if the user email is rendered on the screen', () => {
    renderWithRouter(<Profile />);

    expect(screen.getByText(emailObj.email)).toBeInTheDocument();
  });
  test('if when clicking on the "done recipes" button, the user is directed to the "DoneRecipes" page', () => {
    renderWithRouter(<Profile />);

    expect(screen.getByText(emailObj.email)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /done recipes/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    const doneTitleEl = screen.getByRole('button', { name: /done recipes/i });
    expect(doneTitleEl).toBeInTheDocument();
  });
  test('if when clicking on the "favorite recipes" button, the user is directed to the "FavoriteRecipes" page', () => {
    renderWithRouter(<Profile />);

    expect(screen.getByText(emailObj.email)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    const favoriteTitleEl = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteTitleEl).toBeInTheDocument();
  });
  jest.spyOn(Storage.prototype, 'clear');
  test('Logout button', async () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const logoutButton = getByTestId('profile-logout-btn');

    fireEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
