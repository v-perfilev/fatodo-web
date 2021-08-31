import * as React from 'react';
import {FC, useEffect, useState} from 'react';

import Router from '../pages/router';
import withLoader from '../shared/hocs/with-loader/with-loader';
import {hot} from 'react-hot-loader';
import withWrapper from '../shared/hocs/with-wrapper/with-wrapper';
import withDevelopmentRibbon from '../shared/hocs/with-development-ribbon/with-development-ribbon';
import {SecurityUtils} from '../shared/utils/security.utils';
import {login, requestAccountData} from '../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import withLastLocation from '../shared/hocs/with-last-location/with-last-location';
import {flowRight} from 'lodash';
import withAdditionalMenu from '../shared/hocs/with-additional-menu/with-additional-menu';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const App: FC<Props> = ({login, requestAccountData}: Props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      login();
      requestAccountData();
    }
    setReady(true);
  }, []);

  return ready && <Router />;
};

export default flowRight([
  hot(module),
  withDevelopmentRibbon,
  withLastLocation,
  withLoader,
  withWrapper,
  withAdditionalMenu,
  connector,
])(App);
