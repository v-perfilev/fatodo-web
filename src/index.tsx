import React from 'react';
import ReactDOM from 'react-dom';
import {initI18n} from './shared/i18n';
import {BrowserRouter as Router} from 'react-router-dom';
import {flowRight} from 'lodash';
import {hot} from 'react-hot-loader';
import withStore from './shared/hocs/withStore';
import withMui from './shared/hocs/withMui';
import withSnackDisplay from './shared/hocs/withSnackDisplay';
import withWsClient from './shared/hocs/withWs/withWsClient';
import withLoader from './shared/hocs/withLoader';
import withRootContainer from './shared/hocs/withContainers/withRootContainer';
import {AuthActions} from './store/auth/authActions';
import {SnackActions} from './store/snack/snackActions';
import {bindActionCreators} from 'redux';
import {setupAxiosInterceptors} from './shared/axios';
import {store} from './store/store';

// import styles
import 'react-image-crop/dist/ReactCrop.css';
import './styles.css';

// import translations
import './shared/i18n';
import RootRouter from './routes/RootRouter';
import withDialogs from './shared/hocs/withDialogs/withDialogs';

// setup axios
const axiosActions = bindActionCreators(
  {
    logout: AuthActions.logout,
    enqueueSnack: SnackActions.enqueueSnack,
    handleResponse: SnackActions.handleResponse,
  },
  store.dispatch,
);
setupAxiosInterceptors({
  onUnauthenticated: axiosActions.logout,
  enqueueSnack: axiosActions.enqueueSnack,
  handleResponse: axiosActions.handleResponse,
});

type AppProps = {
  ready: boolean;
};

const App = ({ready}: AppProps) => <Router>{ready && <RootRouter />}</Router>;

const WrappedApp = flowRight([
  hot(module),
  withStore,
  withMui,
  withSnackDisplay,
  withWsClient,
  withLoader,
  withDialogs,
  withRootContainer,
])(App);

const root = document.getElementById('root');
initI18n.then(() => {
  ReactDOM.render(<WrappedApp />, root);
});
