import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/withRedirectTimer';
import {SxProps, Typography} from '@mui/material';
import EmailIcon from '../../components/icons/EmailIcon';
import HomeIcon from '../../components/icons/HomeIcon';
import withBackground from '../../shared/hocs/withBackground';
import LoadingButton from '../../components/controls/LoadingButton';
import FVStack from '../../components/boxes/FVStack';

type NotActivatedProps = RedirectTimerProps;

const NotActivated = ({timer, resetTimer}: NotActivatedProps) => {
  const {t} = useTranslation();
  const [activationLoading, setActivationLoading] = useState<boolean>(false);
  const [activationTimer, setActivationTimer] = useState<number>(undefined);
  const activationTimerMax = 20;
  let timerId: number;

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
    return (): void => clearTimeout(timerId);
  }, [activationTimer]);

  const sendActivationCode = (): void => {
    // TODO
    // setActivationLoading(true);
    // AuthService.requestActivationCode(user)
    //   .then(() => setActivationTimer(activationTimerMax))
    //   .catch(() => setActivationTimer(0))
    //   .finally(() => setActivationLoading(false));
  };

  return (
    <FVStack alignItems="center">
      <Typography sx={codeStyles} variant="h5" color="primary">
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
        {t('buttons.sendActivationCode')}
      </LoadingButton>
      <LoadingButton startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('static:actions.toHomePage')}
      </LoadingButton>
    </FVStack>
  );
};

const codeStyles: SxProps = {
  fontSize: '10em',
  lineHeight: 1,
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer('/', 60)])(NotActivated);
