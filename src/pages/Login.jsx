import React from 'react';
import useForm from '../hooks/useForm';

function Login() {
  const emailInput = useForm('');
  const passwordInput = useForm('');

  // const validEmail = email.toLocaleLowerCase()
  //   .match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return (
    <form>
      <label htmlFor="email-input">
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          value={ emailInput.value }
          onChange={ emailInput.handleChange }
        />
      </label>
      <label htmlFor="password-input">
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ passwordInput.value }
          onChange={ passwordInput.handleChange }
        />
      </label>
      <button id="" data-testid="login-submit-btn" type="button">Enter</button>
    </form>
  );
}

export default Login;
