import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import AccountService from '../../services/account.service';
import {Routes} from '../router';
import {compose} from 'recompose';

type Props = RouteComponentProps<{code: string}>;

const Activation: FC<Props> = (props) => {
  const code = props.match.params.code;
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    AccountService.activate(code)
      .then(() => setIsCodeCorrect(true))
      .catch(() => setError(true));
  }, []);

  if (!isCodeCorrect && !error) {
    return null;
  } else if (isCodeCorrect) {
    return <Redirect to={Routes.ACTIVATED} />;
  } else {
    return <Redirect to={Routes.INTERNAL_ERROR} />;
  }
};

export default compose(withRouter)(Activation);
