import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';

import App from './components/app';
import setupAxiosInterceptors from './config/axios-interceptor';
import init from './config/store';
import { clearAuth } from './shared/reducers/authentication';
import { Provider } from 'react-redux';

const store = init();

const actions = bindActionCreators({clearAuth}, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuth('login.error.unauthorized'));

const root = document.getElementById('root');

const render = Component => ReactDOM.render(
  <Provider store={store}>
    <Component/>
  </Provider>,
  root);

render(App);
