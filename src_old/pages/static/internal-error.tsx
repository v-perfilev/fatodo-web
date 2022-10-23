import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import withRedirectTimer, {RedirectTimerProps} from '../../shared/hocs/with-redirect-timer/with-redirect-timer';
import {useTranslation} from 'react-i18next';
import {staticPageStyles} from './_styles';
import withBackground from '../../shared/hocs/with-background/with-background';
import {HomeIcon} from '../../components/icons/HomeIcon';
import {flowRight} from 'lodash';

type Props = RedirectTimerProps;

const InternalError: FC<Props> = ({timer, resetTimer}: Props) => {
  const classes = staticPageStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary" className={classes.code}>
        505
      </Typography>
      <Box m={1} />
      <Typography variant="h5" color="primary">
        {t('static:internalError.caption')}
      </Typography>
      <Box m={2} />
      <Typography>{t('static:redirectToHome.message', {count: timer})}</Typography>
      <Box m={2} />
      <Button variant="contained" color="primary" size="large" startIcon={<HomIcon />} onClick={resetTimer}>
        {t('buttons.toHomePage')}
      </Button>
    </Box>
  );
};

export default flowRight([withBackground('/images/background-1.jpg'), withRedirectTimer()])(InternalError);