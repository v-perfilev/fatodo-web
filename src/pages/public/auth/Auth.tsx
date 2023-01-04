import React, {CSSProperties, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LANDING_URL, SOCIAL_LOGIN} from '../../../constants';
import {flowRight} from 'lodash';
import {RootRoutes} from '../../../routes/RootRouter';
import {useLocation, useNavigate} from 'react-router-dom';
import withBackground from '../../../shared/hocs/withBackground';
import Link from '../../../components/controls/Link';
import {Stack, Tab, Tabs} from '@mui/material';
import AuthSignInForm from './AuthSignInForm';
import AuthSignUpForm from './AuthSignUpForm';
import SocialButtons from './SocialButtons';

const calculateTabFromRoute = (path: string): number => {
  switch (path) {
    case RootRoutes.REGISTRATION:
      return 1;
    default:
      return 0;
  }
};

const calculateRouteFromTab = (tab: number): string => {
  switch (tab) {
    case 1:
      return RootRoutes.REGISTRATION;
    default:
      return RootRoutes.LOGIN;
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(location.pathname));

  const handleChange = (_, newTab: number): void => {
    navigate(calculateRouteFromTab(newTab), {replace: true});
    setActiveTab(newTab);
  };

  const redirectToHome = useCallback((): void => {
    navigate(RootRoutes.ROOT);
  }, []);

  return (
    <Stack width="100%" spacing={5} alignItems="center">
      <Tabs style={tabStyles} variant="fullWidth" textColor="primary" value={activeTab} onChange={handleChange}>
        <Tab label={t('account:login.header')} />
        <Tab label={t('account:register.header')} />
      </Tabs>
      {activeTab === 0 ? <AuthSignInForm onSuccess={redirectToHome} /> : <AuthSignUpForm onSuccess={redirectToHome} />}
      {SOCIAL_LOGIN && <SocialButtons />}
      <Link to={RootRoutes.ROOT}>{t('static:actions.toForgotPassword')}</Link>
      <Link to={LANDING_URL}>{t('static:actions.toHomePage')}</Link>
    </Stack>
  );
};

const tabStyles: CSSProperties = {
  width: '100%',
};

export default flowRight([withBackground('/images/octopus.png')])(Auth);
