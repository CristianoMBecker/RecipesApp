import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Home({ history }) {
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

export default Home;
