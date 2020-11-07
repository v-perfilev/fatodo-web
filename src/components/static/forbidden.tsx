import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hoc/with-redirect-timer';
import {useTranslation} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hoc/with-background/with-background';
import {HomeIcon} from '../common/icons/home-icon';

type Props = RedirectTimerProps;

const Forbidden: FC<Props> = ({timer, resetTimer}: Props) => {
  const classes = staticPageStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary" className={classes.code}>
        403
      </Typography>
      <Box m={1} />
      <Typography variant="h5" color="primary">
        {t('static:forbidden.caption')}
      </Typography>
      <Box m={2} />
      <Typography>{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Box m={2} />
      <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} onClick={resetTimer}>
        {t('buttons.toHomePage')}
      </Button>
    </Box>
  );
};

export default compose(withBackground('/images/background-1.jpg'), withRedirectTimer())(Forbidden);
