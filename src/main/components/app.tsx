import * as React from 'react';
import './app.scss';
import { hot } from 'react-hot-loader';
import Header from './layout/header/header';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

export default connect()(hot(module)(App));
