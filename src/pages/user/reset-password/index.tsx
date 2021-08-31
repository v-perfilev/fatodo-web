import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import withBackground from '../../../shared/hocs/with-background/with-background';
import {Routes} from '../../router';
import {useTranslation} from 'react-i18next';
import {authPageStyles} from '../_styles';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {LOADER_TIMEOUT} from '../../../constants';
import {Link} from '../../../components/controls';
import ResetPasswordForm from './reset-password-form';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {flowRight} from 'lodash';

type Props = AuthState;

const ResetPassword: FC<Props> = ({isAuthenticated}: Props) => {
  const classes = authPageStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const match = useRouteMatch<{code: string}>();
  const code = match.params.code;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        {t('account:resetPassword.header')}
      </Typography>
      <Box m={1} />
      <ResetPasswordForm code={code} onSuccess={redirectToHome} onFailure={redirectToInternalError} />
      <Box m={2} />
      <Link to={Routes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Box>
  );
};

export default flowRight([withBackground('/images/background-1.jpg'), withAuthState])(ResetPassword);
