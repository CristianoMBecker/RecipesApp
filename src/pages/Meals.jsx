import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  console.log('teste');
  return (
    <div>
      <Header title="Meals" showSearch />
      <Footer />
    </div>
  );
}

export default Meals;
