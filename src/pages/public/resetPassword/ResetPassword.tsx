import React from 'react';
import {useTranslation} from 'react-i18next';
import {LOADER_TIMEOUT} from '../../../constants';
import {flowRight} from 'lodash';
import withBackground from '../../../shared/hocs/withBackground';
import {Stack, Typography} from '@mui/material';
import Link from '../../../components/controls/Link';
import {RootRoutes} from '../../../routes/RootRouter';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {code} = useParams<{code: string}>();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);
  const redirectToInternalError = (): void => navigate(RootRoutes.INTERNAL_ERROR);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Stack width="100%" spacing={5} alignItems="center">
      <Typography variant="h5" color="primary">
        {t('account:resetPassword.header')}
      </Typography>
      <ResetPasswordForm code={code} onSuccess={redirectToHome} onFailure={redirectToInternalError} />
      <Link to={RootRoutes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Stack>
  );
};

export default flowRight([withBackground('/images/background-1.jpg')])(ResetPassword);
