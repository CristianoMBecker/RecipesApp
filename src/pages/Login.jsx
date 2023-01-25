import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import saveOnLocalStorage from '../services/localStorage';

function Login({ history }) {
  const emailInput = useForm('');
  const passwordInput = useForm('');
  const [isDisabled, setIsDisabled] = useState(true);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateLogin = () => {
    const validEmail = validateEmail(emailInput.value);

    const validatePassword = passwordInput.value.length > Number('5');
    if (validEmail && validatePassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const saveUser = () => {
    saveOnLocalStorage('user', { email: emailInput.value });
  };
  return (
    <form>
      <label htmlFor="email-input">
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          value={ emailInput.value }
          onChange={ (e) => {
            emailInput.handleChange(e);
            validateLogin();
          } }
        />
      </label>
      <label htmlFor="password-input">
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ passwordInput.value }
          onChange={ (e) => {
            passwordInput.handleChange(e);
            validateLogin();
          } }
        />
      </label>
      <button
        id=""
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ () => {
          saveUser();
          history.push('/meals');
        } }
      >
        Enter

      </button>
    </form>
  );
}

Login.propTypes = {}.isRequired;

export default Login;
