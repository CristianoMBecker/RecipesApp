import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Home } />
      <Route exact path="/drinks" component={ Home } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

// { /*  */ }
// { /* <Route exact path="/drinks/:id;" component={Meals} />
// <Route exact path="/meals/:id/in-progress" component={Meals} />
// <Route exact path="/drinks/:id/in-progress" component={Meals} /> */ }

// <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */ }
