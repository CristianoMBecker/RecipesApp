import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const passwordInputDataTestId = 'password-input';

describe('renderiza o login e testa se...', () => {
  test('if the email input exists', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
  });

  test('if the password input exists', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveProperty('type', 'password');
  });

  test('if the enter button exists and if it is disabled', () => {
    renderWithRouter(<App />);
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toHaveProperty('type', 'button');
    expect(enterBtn).toBeDisabled();
  });

  test('whether the button becomes enabled when the correct values of the inputs ​are entered', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'test@yahoo.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterBtn.disabled).toBe(false);
  });

  test('if the application is redirected to the meals page when clicking the enter button', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(enterBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'test@yahoo.fr');
    expect(emailInput.value).toBe('test@yahoo.fr');

    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toBe('1234567');

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/meals');
  });
  test('if the localStorage function is called', () => {
    const email = 'test@test.com';
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };

    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(passwordInputDataTestId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterBtn);
    setLocalStorage('user', 'test@test.com');
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(email));
  });
});
