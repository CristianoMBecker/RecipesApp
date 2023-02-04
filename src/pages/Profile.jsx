import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const emailObj = JSON.parse(localStorage.getItem('user'));
    setEmail(emailObj.email);
  }, []);

  return (
    <div>
      <Header title="Profile" showSearch={ false } />
      <p data-testid="profile-email">{ email }</p>
      <button
        onClick={ () => { history.push('/done-recipes'); } }
        data-testid="profile-done-btn"
      >
        Done Recipes

      </button>
      <button
        onClick={ () => { history.push('/favorite-recipes'); } }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
