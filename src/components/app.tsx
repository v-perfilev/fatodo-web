import * as React from 'react';
import './app.scss';
import { hot } from 'react-hot-loader';
import Header from './header/header';
import { connect } from 'react-redux';
import LoginModal from './auth/login-modal';
import Notifier from '../shared/notifier';

class App extends React.Component {
  render() {
    return (
      <div>
        <Notifier/>
        <LoginModal/>
        <Header/>
      </div>
    );
  }
}

export default connect()(hot(module)(App));
