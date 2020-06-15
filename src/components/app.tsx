import * as React from 'react';
import {FC, useEffect} from 'react';

import Router from './router';
import withLoader from '../shared/hoc/with-loader';
import {compose} from 'recompose';
import {hot} from 'react-hot-loader';
import withWrapper from '../shared/hoc/with-wrapper';
import withDevelopmentRibbon from '../shared/hoc/with-development-ribbon';
import {SecurityUtils} from '../shared/utils/security.utils';
import {login, requestAccountData} from '../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const App: FC<Props> = ({login, requestAccountData}: Props) => {
  useEffect(() => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      login();
      requestAccountData();
    }
  }, []);

  return <Router />;
};

export default compose(hot(module), withDevelopmentRibbon, withLoader, withWrapper, connector)(App);
