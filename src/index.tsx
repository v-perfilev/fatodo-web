import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/axios';
import initStore from './shared/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './shared/theme';
import 'typeface-roboto';
import { clearAuth } from './store/actions/auth.actions';
import { SnackbarProvider } from 'notistack';
import { enqueueSnackbar } from './store/actions/notification.actions';

const root = document.getElementById('root');
const store = initStore;
const rootActions = bindActionCreators({ clearAuth, enqueueSnackbar }, store.dispatch);
setupAxiosInterceptors({
    onUnauthenticated: rootActions.clearAuth,
    enqueueSnackbar: rootActions.enqueueSnackbar,
  }
);

const render = Component => ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <Component/>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  root
);

render(App);
