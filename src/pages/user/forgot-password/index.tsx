import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import ForgotPasswordForm from './forgot-password-form';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {authPageStyles} from '../_styles';
import {Routes} from '../../router';
import {LOADER_TIMEOUT} from '../../../constants';
import withBackground from '../../../shared/hocs/with-background/with-background';
import {Link} from '../../../components/controls';
import withAuthState from '../../../shared/hocs/with-auth-state';
import {flowRight} from 'lodash';

type Props = AuthState;

const ForgotPassword: FC<Props> = ({isAuthenticated}: Props) => {
  const classes = authPageStyles();
  const history = useHistory();
  const {t} = useTranslation();

  const redirectToHome = (): void => history.push(Routes.ROOT);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        {t('account:forgotPassword.header')}
      </Typography>
      <Box m={1} />
      <ForgotPasswordForm onSuccess={redirectToHome} />
      <Box m={2} />
      <Link to={Routes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Box>
  );
};

export default flowRight([withBackground('/images/background-1.jpg'), withAuthState])(ForgotPassword);
