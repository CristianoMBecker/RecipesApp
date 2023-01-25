import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('renderiza o login e testa se...', () => {
  test('if the email input exists', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
  });

  test('if the password input exists', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId('password-input');
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
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'test@yahoo.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterBtn.disabled).toBe(false);
  });
});
