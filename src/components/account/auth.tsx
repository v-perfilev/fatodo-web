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
import RegisterForm from './registration-form';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {SOCIAL_LOGIN} from '../../constants';
import SocialLogin from './social-buttons';
import {RootState} from '../../store';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = RouteComponentProps & ConnectedProps<typeof connector>;

const Auth: FC<Props> = ({authState: {isAuthenticated}, match, history}: Props) => {
  const classes = authPageStyles();
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(match.path === Routes.LOGIN ? 0 : 1);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(newTab === 0 ? Routes.LOGIN : Routes.REGISTRATION);
    setActiveTab(newTab);
  };

  const redirectToHome = (): void => history.push(Routes.ROOT);

  return isAuthenticated ? (
    <Redirect to={Routes.ROOT} />
  ) : (
    <Box className={classes.root}>
      <Tabs variant="fullWidth" textColor="primary" style={{width: '100%'}} value={activeTab} onChange={handleChange}>
        <Tab label={t('form:login.header')} />
        <Tab label={t('form:registration.header')} />
      </Tabs>
      <Box m={1} />
      {activeTab === 0 ? <LoginForm onSuccess={redirectToHome} /> : <RegisterForm onSuccess={redirectToHome} />}
      {SOCIAL_LOGIN && (
        <>
          <Box m={2} />
          <SocialLogin />
        </>
      )}
      <Box m={2} />
      <Link to={Routes.ROOT}>
        <Trans i18nKey={'buttons.toHomePage'} />
      </Link>
    </Box>
  );
};

export default compose(withTranslation(), withRouter, withBackground('/images/background-1.jpg'), connector)(Auth);
