import * as React from 'react';
import {FC, useCallback, useState} from 'react';
import {Box, Tab, Tabs} from '@material-ui/core';
import withBackground from '../../../shared/hocs/with-background/with-background';
import {Routes} from '../../router';
import {useTranslation} from 'react-i18next';
import {authPageStyles} from '../_styles';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {LANDING_URL, SOCIAL_LOGIN} from '../../../constants';
import {Link} from '../../../components/controls';
import {SocialButtons} from './social-buttons';
import LoginForm from './login-form/login-form';
import RegistrationForm from './registration-form/registration-form';
import {flowRight} from 'lodash';

const calculateTabFromRoute = (path: string): number => {
  switch (path) {
    case Routes.REGISTRATION:
      return 1;
    default:
      return 0;
  }
};

const calculateRouteFromTab = (tab: number): string => {
  switch (tab) {
    case 1:
      return Routes.REGISTRATION;
    default:
      return Routes.LOGIN;
  }
};

const Auth: FC = () => {
  const classes = authPageStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(match.path));
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(calculateRouteFromTab(newTab));
    setActiveTab(newTab);
  };

  const redirectToHome = useCallback((): void => {
    history.push(Routes.ROOT);
  }, []);

  const tabsStyle = {width: '100%'};

  return (
    <Box className={classes.root}>
      <Tabs variant="fullWidth" textColor="primary" style={tabsStyle} value={activeTab} onChange={handleChange}>
        <Tab label={t('account:login.header')} />
        <Tab label={t('account:register.header')} />
      </Tabs>
      <Box m={1} />
      {activeTab === 0 ? (
        <LoginForm loading={loading} setLoading={setLoading} />
      ) : (
        <RegistrationForm onSuccess={redirectToHome} loading={loading} setLoading={setLoading} />
      )}
      {SOCIAL_LOGIN && (
        <>
          <Box m={2} />
          <SocialButtons />
        </>
      )}
      <Box m={2} />
      <Link to={LANDING_URL}>{t('buttons.toHomePage')}</Link>
    </Box>
  );
};

export default flowRight([withBackground('/images/background-1.jpg')])(Auth);