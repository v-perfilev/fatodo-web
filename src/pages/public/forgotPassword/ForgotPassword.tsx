import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import {LOADER_TIMEOUT} from '../../../constants';
import {flowRight} from 'lodash';
import {Stack, Typography} from '@mui/material';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {RootRoutes} from '../../../routes/RootRouter';
import withBackground from '../../../shared/hocs/withBackground';
import Link from '../../../components/controls/Link';

const ForgotPassword = () => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Stack width="100%" spacing={5} alignItems="center">
      <Typography variant="h5" color="primary">
        {t('account:forgotPassword.header')}
      </Typography>
      <ForgotPasswordForm onSuccess={redirectToHome} />
      <Link to={RootRoutes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Stack>
  );
};

export default flowRight([withBackground('/images/background-1.jpg')])(ForgotPassword);
