import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {Trans} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hoc/with-background';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../router';
import AccountService from '../../services/account.service';
import {HomeIcon} from '../common/icons/home-icon';
import {EmailIcon} from '../common/icons/email-icon';
import CircularProgressTimer from '../common/circular-progress-timer';

interface LocationState {
  email: string;
}

type Props = RouteComponentProps<{}, any, LocationState> & RedirectTimerProps;

const NotActivated: FC<Props> = ({timer, resetTimer, location}: Props) => {
  const classes = staticPageStyles();
  const email = location?.state?.email;
  const [activationCodeLoading, setActivationCodeLoading] = useState<boolean>(false);
  const [activationCodeTimer, setActivationCodeTimer] = useState<number>(0);
  const activationCodeTimerMaxValue = 20;
  let timerId;

  useEffect(() => {
    if (timer > 0 && !timerId) {
      timerId = setTimeout(() => setActivationCodeTimer((prevState) => prevState - 1), 1000);
    } else {
      clearTimeout(timerId);
    }
    return (): void => clearTimeout(timerId);
  }, [timer]);

  const requestActivationCode = (): void => {
    setActivationCodeLoading(true);
    AccountService.requestActivationCode(email)
      .then(() => setActivationCodeTimer(activationCodeTimerMaxValue))
      .catch(() => setActivationCodeTimer(activationCodeTimerMaxValue))
      .finally(() => setActivationCodeLoading(false));
  };

  return !email ? (
    <Redirect to={Routes.INTERNAL_ERROR} />
  ) : (
    <Box textAlign="center">
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'static:notActivated.caption'} values={{email: email}} />
      </Typography>
      <Box m={2} />
      <Typography>
        <Trans i18nKey={'static:redirectToHome.message'} count={timer} />
      </Typography>
      <Box m={2} />
      <Box className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={activationCodeTimer > 0}
          startIcon={<EmailIcon />}
          onClick={requestActivationCode}
        >
          <Trans i18nKey={'buttons.requestActivationCode'} />
        </Button>
        <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
          <Trans i18nKey={'buttons.toHomePage'} />
        </Button>
      </Box>
      <Box m={4} />

      <Box>
        <Box className={classes.loaders}>
          {activationCodeTimer > 0 && (
            <CircularProgressTimer maxValue={activationCodeTimerMaxValue} value={activationCodeTimer} />
          )}
          {activationCodeLoading && <CircularProgress />}
        </Box>
      </Box>
    </Box>
  );
};

export default compose(
  withBackground('/images/background-1.jpg'),
  withRedirectTimer('/', 60),
  withRouter
)(NotActivated);
