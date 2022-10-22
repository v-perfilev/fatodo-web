import React from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import {Button, SxProps, Typography} from '@mui/material';
import HomeIcon from '../../components/icons/HomeIcon';
import withBackground from '../../shared/hocs/withBackground';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/withRedirectTimer';
import FVStack from '../../components/boxes/FVStack';

type ForbiddenProps = RedirectTimerProps;

const Forbidden = ({timer, resetTimer}: ForbiddenProps) => {
  const {t} = useTranslation();

  return (
    <FVStack alignItems="center">
      <Typography sx={codeStyles} variant="h5" color="primary">
        403
      </Typography>
      <Typography variant="h5" color="primary">
        {t('static:forbidden.caption')}
      </Typography>
      <Typography textAlign="center">{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('static:actions.toHomePage')}
      </Button>
    </FVStack>
  );
};

const codeStyles: SxProps = {
  fontSize: '10em',
  lineHeight: 1,
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer()])(Forbidden);
