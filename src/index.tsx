import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/axios';
import store from './shared/store';
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {theme} from './shared/theme';
import 'typeface-roboto';
import {clearAuth} from './store/actions/auth.actions';
import {SnackbarProvider} from 'notistack';
import {enqueueSnackbar} from './store/actions/notification.actions';
import i18n from './shared/i18n';
import './shared/i18n';
import 'typeface-roboto-multilang/cyrillic.css';
import {FC} from 'react';

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
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

i18n.init().then(() => {
  ReactDOM.render(<Root />, root);
});
