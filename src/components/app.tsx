import * as React from 'react';
import {FC} from 'react';
import {hot} from 'react-hot-loader';
import Header from './header/header';
import Notifier from '../shared/notifier';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';

const App: FC<any> = () => (
  <Router>
    <Notifier />
    <Header />
    <Routes />
  </Router>
);

export default hot(module)(App);
