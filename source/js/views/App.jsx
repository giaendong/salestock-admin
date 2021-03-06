import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/Menu';
import Home from 'views/Home';
import People from 'views/People';
import Dress from 'views/Dress';
import DressCreate from 'views/DressCreate';
import NotFound from 'views/NotFound';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Menu />

        <div className='Page'>
          <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />
            <Route path={ routeCodes.PEOPLE } component={ People } />
            <Route path={ routeCodes.DRESS } component={ Dress } />
            <Route path={ routeCodes.DRESSCREATE } component={ DressCreate } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
