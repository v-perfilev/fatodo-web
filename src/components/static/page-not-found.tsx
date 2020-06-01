import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {staticPageStyles} from './_styles';
import {Trans} from 'react-i18next';
import withBackground from '../../shared/hoc/with-background';
import {HomeIcon} from '../common/icons/home-icon';

type Props = RedirectTimerProps;

const PageNotFound: FC<Props> = ({timer, resetTimer}: Props) => {
  const classes = staticPageStyles();

  return (
    <Box textAlign="center">
      <Typography variant="h5" color="primary" className={classes.code}>
        404
      </Typography>
      <Box m={1} />
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'static:pageNotFound.caption'} />
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

export default compose(withBackground('/images/background-1.jpg'), withRedirectTimer())(PageNotFound);
