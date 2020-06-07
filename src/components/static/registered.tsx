import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {Trans} from 'react-i18next';
import {compose} from 'recompose';
import withBackground from '../../shared/hoc/with-background';
import {HomeIcon} from '../common/icons/home-icon';

type Props = RedirectTimerProps;

const Registered: FC<Props> = ({timer, resetTimer}: Props) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'static:registered.caption'} />
      </Typography>
      <Box m={2} />
      <Typography>
        <Trans i18nKey={'static:redirectToHome.message'} count={timer} />
      </Typography>
      <Box m={2} />
      <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
        <Trans i18nKey={'buttons.toHomePage'} />
      </Button>
    </Box>
  );
};

export default compose(withBackground('/images/background-1.jpg'), withRedirectTimer())(Registered);
