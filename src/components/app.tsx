import * as React from 'react';
import {FC} from 'react';
import {hot} from 'react-hot-loader';
import Header from './header/header';
import LoginModal from './auth/login-modal';
import Notifier from '../shared/notifier';

const App: FC<any> = () => (
  <div>
    <Notifier />
    <LoginModal />
    <Header />
  </div>
);

export default hot(module)(App);
