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
import {compose} from 'recompose';

// import styles
import 'react-image-crop/dist/ReactCrop.css';
import './styles.css';
import withStore from './shared/hocs/with-store';
import withDefaultTheme from './shared/hocs/with-default-theme';
import withMui from './shared/hocs/with-mui';
import withSnack from './shared/hocs/with-snack/with-snack';
import withMessenger from './shared/hocs/with-messenger';

const Root: FC = () => {
  // setup axios
  const actions = bindActionCreators({clearAuth}, store.dispatch);
  setupAxiosInterceptors({
    onUnauthenticated: actions.clearAuth,
  });

  return (
    <Router>
      <CssBaseline />
      <App />
    </Router>
  );
};

const WrappedRoot = compose(withStore, withDefaultTheme, withMui, withSnack, withMessenger)(Root);

const root = document.getElementById('root');
initLanguages.then(() => {
  ReactDOM.render(<WrappedRoot />, root);
});
