import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {Trans} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hoc/with-background';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../router';
import AccountService from '../../services/account.service';
import {EmailIcon} from '../common/icons/email-icon';
import {HomeIcon} from '../common/icons/home-icon';
import LoadingButton from '../common/buttons/loading-button';

interface LocationState {
  email: string;
}

type Props = RouteComponentProps<{}, any, LocationState> & RedirectTimerProps;

const NotActivated: FC<Props> = ({timer, resetTimer, location}: Props) => {
  const classes = staticPageStyles();
  const email = location?.state?.email;
  const [activationLoading, setActivationLoading] = useState<boolean>(false);
  const [activationTimer, setActivationTimer] = useState<number>(undefined);
  const activationTimerMax = 20;
  let timerId;

  useEffect(() => {
    if (activationTimer !== undefined) {
      if (activationTimer >= 0) {
        timerId = setTimeout(() => setActivationTimer((prevState) => prevState - 1), 1000);
      }
      if (activationTimer < 0) {
        setActivationTimer(undefined);
        clearTimeout(timerId);
      }
    }
    return (): void => clearTimeout(timerId);
  }, [activationTimer]);

  const sendActivationCode = (): void => {
    setActivationLoading(true);
    AccountService.requestActivationCode(email)
      .then(() => setActivationTimer(activationTimerMax))
      .catch(() => setActivationTimer(activationTimerMax))
      .finally(() => setActivationLoading(false));
  };

  return !email ? (
    <Redirect to={Routes.INTERNAL_ERROR} />
  ) : (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'static:notActivated.caption'} values={{email: email}} />
      </Typography>
      <Box m={2} />
      <Typography>
        <Trans i18nKey={'static:redirectToHome.message'} count={timer} />
      </Typography>
      <Box m={2} />
      <Box className={classes.buttons}>
        <LoadingButton
          startIcon={<EmailIcon />}
          onClick={sendActivationCode}
          disabled={activationTimer !== undefined}
          loading={activationLoading}
          progressValue={activationTimer * (100 / activationTimerMax)}
        >
          <Trans i18nKey={'buttons.sendActivationCode'} />
        </LoadingButton>
        <LoadingButton startIcon={<HomeIcon />} onClick={resetTimer}>
          <Trans i18nKey={'buttons.toHomePage'} />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default compose(
  withBackground('/images/background-1.jpg'),
  withRedirectTimer('/', 60),
  withRouter
)(NotActivated);
