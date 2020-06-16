import * as React from 'react';
import {FC} from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/axios';
import store from './store/store';
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {theme} from './shared/theme';
import {clearAuth} from './store/actions/auth.actions';
import {enqueueSnackbar} from './store/actions/notification.actions';
import {initLanguages} from './shared/i18n';
import './shared/i18n';
import {BrowserRouter as Router} from 'react-router-dom';
import Notifier from './shared/notification/notifier';
import {NotificationProvider} from './shared/notification/notification-provider';

const root = document.getElementById('root');

const axiosActions = bindActionCreators({clearAuth, enqueueSnackbar}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueSnackbar: axiosActions.enqueueSnackbar,
});

const Root: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Router>
          <CssBaseline />
          <Notifier />
          <App />
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  </Provider>
);

initLanguages.then(() => {
  ReactDOM.render(<Root />, root);
});
