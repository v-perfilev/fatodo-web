import * as React from 'react';
import './app.scss';
import { hot } from 'react-hot-loader';
import Header from './header/header';
import { connect } from 'react-redux';
import LoginModal from './auth/login-modal';

class App extends React.Component {
  render() {
    return (
      <div>
        <LoginModal/>
        <Header/>
      </div>
    );
  }
}

export default connect()(hot(module)(App));
