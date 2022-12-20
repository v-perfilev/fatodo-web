import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/withRedirectTimer';
import {Typography} from '@mui/material';
import EmailIcon from '../../components/icons/EmailIcon';
import HomeIcon from '../../components/icons/HomeIcon';
import withBackground from '../../shared/hocs/withBackground';
import LoadingButton from '../../components/controls/LoadingButton';
import FVStack from '../../components/boxes/FVStack';
import AuthService from '../../services/AuthService';
import {useLocation, useNavigate} from 'react-router-dom';
import {RootRoutes} from '../../routes/RootRouter';

type NotActivatedProps = RedirectTimerProps;

const NotActivated = ({timer, resetTimer}: NotActivatedProps) => {
  const {t} = useTranslation();
  const location = useLocation();
  const [activationLoading, setActivationLoading] = useState<boolean>(false);
  const [activationTimer, setActivationTimer] = useState<number>(undefined);
  const navigate = useNavigate();
  const activationTimerMax = 20;
  let timerId: number;

  const user = location.state?.user;

  const redirectToRoot = (): void => navigate(RootRoutes.ROOT);

  const sendActivationCode = (): void => {
    setActivationLoading(true);
    AuthService.requestActivationCode(user)
      .then(() => setActivationTimer(activationTimerMax))
      .catch(() => setActivationTimer(0))
      .finally(() => setActivationLoading(false));
  };

  useEffect(() => {
    !user && redirectToRoot();
  }, []);

  useEffect(() => {
    if (activationTimer !== undefined) {
      if (activationTimer >= 0) {
        timerId = window.setTimeout(() => setActivationTimer((prevState) => prevState - 1), 1000);
      }
      if (activationTimer < 0) {
        setActivationTimer(undefined);
        window.clearTimeout(timerId);
      }
    }
    return (): void => window.clearTimeout(timerId);
  }, [activationTimer]);

  return (
    <FVStack alignItems="center">
      <Typography variant="h5" color="primary" lineHeight={1} textAlign="center" fontSize={25}>
        {t('static:notActivated.caption')}
      </Typography>
      <Typography textAlign="center">{t('static:redirectToHome.message', {count: timer})}</Typography>
      <LoadingButton
        startIcon={<EmailIcon />}
        onClick={sendActivationCode}
        disabled={activationLoading || activationTimer !== undefined}
        loading={activationLoading}
        progressValue={activationTimer * (100 / activationTimerMax)}
      >
        {t('static:actions.sendActivationCode')}
      </LoadingButton>
      <LoadingButton startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('static:actions.toHomePage')}
      </LoadingButton>
    </FVStack>
  );
};

export default flowRight([withBackground('/images/octopus.png'), withRedirectTimer])(NotActivated);
