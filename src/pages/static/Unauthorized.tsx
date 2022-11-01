import React from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/withRedirectTimer';
import {Button, Typography} from '@mui/material';
import HomeIcon from '../../components/icons/HomeIcon';
import withBackground from '../../shared/hocs/withBackground';
import FVStack from '../../components/boxes/FVStack';

type UnauthorizedProps = RedirectTimerProps;

const Unauthorized = ({timer, resetTimer}: UnauthorizedProps) => {
  const {t} = useTranslation();

  return (
    <FVStack alignItems="center">
      <Typography variant="h5" color="primary" lineHeight={1} fontSize={150}>
        401
      </Typography>
      <Typography variant="h5" color="primary">
        {t('static:unauthorized.caption')}
      </Typography>
      <Typography textAlign="center">{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('static:actions.toHomePage')}
      </Button>
    </FVStack>
  );
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer()])(Unauthorized);
