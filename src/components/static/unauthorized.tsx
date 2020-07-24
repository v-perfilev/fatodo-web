import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {Trans} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hoc/with-background';
import {HomeIcon} from '../../shared/components/icons/home-icon';

type Props = RedirectTimerProps;

const Unauthorized: FC<Props> = ({timer, resetTimer}: Props) => {
  const classes = staticPageStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary" className={classes.code}>
        401
      </Typography>
      <Box m={1} />
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'static:unauthorized.caption'} />
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

export default compose(withBackground, withRedirectTimer())(Unauthorized);
