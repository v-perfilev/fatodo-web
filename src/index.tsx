import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/config/axios-interceptor';
import init from './shared/config/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './shared/config/theme';
import 'typeface-roboto';
import { clearAuth } from './redux/actions/auth-actions';

const store = init();

const actions = bindActionCreators({clearAuth}, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuth());

const root = document.getElementById('root');

const render = Component => ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Component/>
    </Provider>
  </ThemeProvider>,
  root);

render(App);
