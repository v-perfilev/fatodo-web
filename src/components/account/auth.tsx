import * as React from 'react';
import {FC, useState} from 'react';
import {Box, Tab, Tabs} from '@material-ui/core';
import {compose} from 'recompose';
import withBackground from '../../shared/hoc/with-background';
import LoginForm from '../account/login-form';
import {Routes} from '../router';
import Link from '../common/link';
import {Trans, useTranslation, withTranslation} from 'react-i18next';
import {authPageStyles} from './_styles';
import RegisterForm from './register-form';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type Props = RouteComponentProps;

const Auth: FC<Props> = ({match, history}: Props) => {
  const classes = authPageStyles();
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(match.path === Routes.LOGIN ? 0 : 1);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(newTab === 0 ? Routes.LOGIN : Routes.REGISTER);
    setActiveTab(newTab);
  };

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToRegister = (): void => history.push(Routes.REGISTERED);

  return (
    <Box className={classes.root}>
      <Tabs variant="fullWidth" textColor="primary" style={{width: '100%'}} value={activeTab} onChange={handleChange}>
        <Tab label={t('form:login.header')} />
        <Tab label={t('form:register.header')} />
      </Tabs>
      <Box m={1} />
      {activeTab === 0 ? <LoginForm onSuccess={redirectToHome} /> : <RegisterForm onSuccess={redirectToRegister} />}
      <Box m={1} />
      <Link to={Routes.FORGOT_PASSWORD}>
        <Trans i18nKey={'buttons.forgotPassword'} />
      </Link>
      <Box m={1} />
      <Link to={Routes.ROOT}>
        <Trans i18nKey={'buttons.toHomePage'} />
      </Link>
    </Box>
  );
};

export default compose(withTranslation(), withRouter, withBackground('/images/background-1.jpg', false))(Auth);
