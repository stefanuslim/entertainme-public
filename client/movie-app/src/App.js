import React from 'react';
import './App.css';
import Home from './pages/Home'
import Movie from './pages/Movie'
import Series from './pages/Series'
import DetailMovie from './pages/DetailMovie'
import DetailSeries from './pages/DetailSeries'
import Favorites from './pages/Favorites'
import FormAdd from './pages/FormAdd'
import FormEdit from './pages/FormEdit'
import { ApolloProvider } from '@apollo/client';
import  client  from './config'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App" style={{backgroundImage: "url('https://img.freepik.com/free-photo/black-marble-concrete-background_124337-132.jpg?size=626&ext=jpg')"}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies">
            <Movie />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route path="/movie/create">
          <FormAdd />
          </Route>
          <Route path="/movie/edit/:id">
          <FormEdit />
          </Route>
          <Route path="/movie/:id">
            <DetailMovie />
          </Route>
          <Route exact path="/series">
            <Series />
          </Route>
          <Route path="/series/create">
          <FormAdd />
          </Route>
          <Route path="/series/edit/:id">
          <FormEdit />
          </Route>
          <Route path="/series/:id">
            <DetailSeries />
          </Route>
        </Switch>
      </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
