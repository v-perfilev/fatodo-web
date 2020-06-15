import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withBackground from '../../shared/hoc/with-background';
import {Routes} from '../router';
import Link from '../common/link';
import {Trans, withTranslation} from 'react-i18next';
import {authPageStyles} from './_styles';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import ForgotPasswordForm from './forgot-password-form';
import {RootState} from '../../store';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = RouteComponentProps & ConnectedProps<typeof connector>;

const ForgotPassword: FC<Props> = ({authState: {isAuthenticated}, history}: Props) => {
  const classes = authPageStyles();

  const redirectToHome = (): void => history.push(Routes.ROOT);

  return isAuthenticated ? (
    <Redirect to={Routes.ROOT} />
  ) : (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        <Trans i18nKey={'form:forgotPassword.header'} />
      </Typography>
      <Box m={1} />
      <ForgotPasswordForm onSuccess={redirectToHome} />
      <Box m={2} />
      <Link to={Routes.ROOT}>
        <Trans i18nKey={'buttons.toHomePage'} />
      </Link>
    </Box>
  );
};

export default compose(
  withTranslation(),
  withRouter,
  withBackground('/images/background-1.jpg'),
  connector
)(ForgotPassword);
