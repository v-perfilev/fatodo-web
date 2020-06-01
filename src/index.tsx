import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/axios';
import store from './store/store';
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {theme} from './shared/theme';
import {clearAuth} from './store/actions/auth.actions';
import {SnackbarProvider} from 'notistack';
import {enqueueSnackbar} from './store/actions/notification.actions';
import i18n from './shared/i18n';
import './shared/i18n';
import {FC} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Notifier from './shared/notification/notifier';

const root = document.getElementById('root');

const axiosActions = bindActionCreators({clearAuth, enqueueSnackbar}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueSnackbar: axiosActions.enqueueSnackbar,
});

const Root: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <Router>
          <CssBaseline />
          <Notifier />
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

i18n.init().then(() => {
  ReactDOM.render(<Root />, root);
});
