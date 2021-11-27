import * as React from 'react';
import {FC} from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './shared/axios';
import store from './store/store';
import {CssBaseline} from '@material-ui/core';
import {clearAuth} from './store/actions/auth.actions';
import {initLanguages} from './shared/i18n';
import './shared/i18n';
import {BrowserRouter as Router} from 'react-router-dom';

// import styles
import 'react-image-crop/dist/ReactCrop.css';
import './styles.css';

import withStore from './shared/hocs/with-store/with-store';
import withDefaultTheme from './shared/hocs/with-default-theme/with-default-theme';
import withMui from './shared/hocs/with-mui/with-mui';
import withSnack from './shared/hocs/with-snack/with-snack';
import withChat from './shared/hocs/with-chat/with-chat';
import {enqueueReduxSnack} from './store/actions/snack.actions';
import withDialogs from './shared/hocs/with-dialogs/with-dialogs';
import {flowRight} from 'lodash';
import withWsClient from './shared/hocs/with-ws/with-ws-client';
import withContacts from './shared/hocs/with-contacts/with-contacts';
import withContactInfo from './shared/hocs/with-contacts/with-contact-info';
import withStyles from './shared/hocs/with-styles/with-styles';

// setup axios
const axiosActions = bindActionCreators({clearAuth, enqueueReduxSnack}, store.dispatch);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.clearAuth,
  enqueueReduxSnackbar: axiosActions.enqueueReduxSnack,
});

const Root: FC = () => (
  <Router>
    <CssBaseline />
    <App />
  </Router>
);

const WrappedRoot = flowRight([
  withStore,
  withDefaultTheme,
  withStyles,
  withMui,
  withSnack,
  withWsClient,
  withChat,
  withContactInfo,
  withContacts,
  withDialogs,
])(Root);

const root = document.getElementById('root');
initLanguages.then(() => {
  ReactDOM.render(<WrappedRoot />, root);
});
