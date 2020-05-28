import * as React from 'react';
import {FC} from 'react';
import Header from './header/header';
import withAppWrapper from './common/wrappers/with-app-wrapper';

import Routes from './routes';
import withLoading from './common/hoc/with-loading';
import {compose} from 'redux';
import {hot} from 'react-hot-loader';

const App: FC<any> = () => (
  <>
    <Header />
    <Routes />
  </>
);

const composer = compose(hot(module), withLoading, withAppWrapper);
export default composer(App);
