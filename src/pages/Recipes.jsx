import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes({ history }) {
  if (history.location.pathname === '/meals') {
    return (
      <div>
        <Header title="Meals" showSearch />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header title="Drinks" showSearch />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {}.isrequired;

export default Recipes;
