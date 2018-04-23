import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './pages/Home';
import FilmDetail from './pages/FilmDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/films/:filmId" component={FilmDetail} />
    <Route path="*" component={Home} />
  </Route>
);
