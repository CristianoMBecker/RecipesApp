import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

import doneIcon from '../imagesFromFigma/doneIcon.svg';
import favoriteIcon from '../imagesFromFigma/favoriteIcon.svg';
import logout from '../imagesFromFigma/logout.svg';
import './Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const emailObj = JSON.parse(localStorage.getItem('user'));
    if (emailObj) {
      setEmail(emailObj.email);
    }
  }, []);

  const history = useHistory();
  return (
    <div className="done-recipe-content">
      <Header title="Profile" showSearch={ false } />
      <p
        data-testid="profile-email"
        className="email"
      >
        { email === ''
          ? 'user email not found' : email}

      </p>
      <button
        className="profile-btn"
        onClick={ () => { history.push('/done-recipes'); } }
        data-testid="profile-done-btn"
      >
        <img src={ doneIcon } alt="done icon" />
        <span>Done Recipes</span>

      </button>
      <hr />
      <button
        className="profile-btn"
        onClick={ () => { history.push('/favorite-recipes'); } }
        data-testid="profile-favorite-btn"
      >
        <img src={ favoriteIcon } alt="favorite icon" />
        <span>Favorite Recipes</span>
      </button>
      <hr />
      <button
        className="profile-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        data-testid="profile-logout-btn"
      >
        <img src={ logout } alt="logout icon" />
        <span>Logout</span>
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
