import React from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/withRedirectTimer';
import {Button, Stack, SxProps, Typography} from '@mui/material';
import withBackground from '../../shared/hocs/withBackground';
import HomeIcon from '../../components/icons/HomeIcon';

type PageNotFoundProps = RedirectTimerProps;

const PageNotFound = ({timer, resetTimer}: PageNotFoundProps) => {
  const {t} = useTranslation();

  return (
    <Stack width="100%" spacing={2} alignItems="center">
      <Typography sx={codeStyles} variant="h5" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="primary">
        {t('static:pageNotFound.caption')}
      </Typography>
      <Typography>{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('buttons.toHomePage')}
      </Button>
    </Stack>
  );
};

const codeStyles: SxProps = {
  fontSize: '10em',
  lineHeight: 1,
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer()])(PageNotFound);
