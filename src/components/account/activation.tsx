import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import AccountService from '../../services/account.service';
import {Routes} from '../router';
import {compose} from 'recompose';

type Props = RouteComponentProps<{code: string}>;

const Activation: FC<Props> = (props) => {
  const code = props.match.params.code;
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    AccountService.activate(code)
      .then(() => setActivated(true))
      .catch(() => setError(true));
  }, []);

  if (!activated && !error) {
    return null;
  } else if (activated) {
    return <Redirect to={Routes.ACTIVATED} />;
  } else {
    return <Redirect to={Routes.INTERNAL_ERROR} />;
  }
};

export default compose(withRouter)(Activation);
