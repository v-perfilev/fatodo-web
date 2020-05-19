import * as React from 'react';
import {FC} from 'react';
import {hot} from 'react-hot-loader';
import Header from './header/header';
import AppWrapper from './common/wrappers/app-wrapper';

import Routes from './routes';
import ContentWrapper from './common/wrappers/content-wrapper';

const App: FC<any> = () => (
  <AppWrapper>
    <Header />
    <ContentWrapper>
      <Routes />
    </ContentWrapper>
  </AppWrapper>
);

export default hot(module)(App);
