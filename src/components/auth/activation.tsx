import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {compose} from 'redux';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import AuthService from '../../services/auth.service';
import {RouteNames} from '../routes';

type Props = RouteComponentProps<{code: string}>

const Activation: FC<null> = (props: Props) => {
  console.log(props);
  const code = props.match.params.code;
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => sendActivationRequest(code), [props]);

  const sendActivationRequest = (code: string) => {
    AuthService.activate(code)
      .then(() => setActivated(true))
      .catch(() => setError(true));
  };

  if (!activated && !error) {
    return null;
  } else if (activated) {
    return <Redirect to={RouteNames.ACTIVATED} />;
  } else {
    return <Redirect to={RouteNames.INTERNAL_ERROR} />;
  }
};

const composer = compose(withRouter);
export default composer(Activation);
