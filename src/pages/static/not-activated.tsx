import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@material-ui/core';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/with-redirect-timer/with-redirect-timer';
import {useTranslation} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hocs/with-background/with-background';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../router';
import AuthService from '../../services/auth.service';
import {HomeIcon} from '../../components/icons/home-icon';
import {EmailIcon} from '../../components/icons/email-icon';
import {LoadingButton} from '../../components/controls';
import {flowRight} from 'lodash';

type Props = RedirectTimerProps;

const NotActivated: FC<Props> = ({timer, resetTimer}: Props) => {
  const classes = staticPageStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const location = useLocation<{user: string}>();
  const user = location.state.user;
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
    AuthService.requestActivationCode(user)
      .then(() => setActivationTimer(activationTimerMax))
      .catch(() => setActivationTimer(0))
      .finally(() => setActivationLoading(false));
  };

  if (!user) {
    history.push(Routes.INTERNAL_ERROR);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        {t('static:notActivated.caption', {email: user})}
      </Typography>
      <Box m={2} />
      <Typography>{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Box m={2} />
      <LoadingButton
        startIcon={<EmailIcon />}
        onClick={sendActivationCode}
        disabled={activationLoading || activationTimer !== undefined}
        loading={activationLoading}
        progressValue={activationTimer * (100 / activationTimerMax)}
      >
        {t('buttons.sendActivationCode')}
      </LoadingButton>
      <Box m={2} />
      <LoadingButton startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('buttons.toHomePage')}
      </LoadingButton>
    </Box>
  );
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer('/', 60)])(NotActivated);
