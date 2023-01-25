import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      { /* <Route exact path="/drinks/:id" component={ Drinks } />
      <Route exact path="/meals/:id" component={Meals} />
      <Route exact path="/drinks/:id;" component={Meals} />
      <Route exact path="/meals/:id/in-progress" component={Meals} />
      <Route exact path="/drinks/:id/in-progress" component={Meals} />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */ }
    </Switch>
  );
}

export default App;
