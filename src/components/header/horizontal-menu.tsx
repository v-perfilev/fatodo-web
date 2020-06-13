import {RootState} from '../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box} from '@material-ui/core';
import {logout} from '../../store/actions/auth.actions';
import {Trans, withTranslation} from 'react-i18next';
import {horizontalMenuStyles} from './_styles';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {LoginIcon} from '../common/icons/login-icon';
import {LogoutIcon} from '../common/icons/logout-icon';
import {SignUpIcon} from '../common/icons/signup-icon';
import {compose} from 'recompose';
import {Routes} from '../router';
import LanguageSelect from '../common/language-select';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

const HorizontalMenu: FC<Props> = ({authState: {isAuthenticated}, logout, history}: Props) => {
  const classes = horizontalMenuStyles();

  const redirectToLogin = (): void => history.push(Routes.LOGIN);
  const redirectToRegistration = (): void => history.push(Routes.REGISTRATION);

  return (
    <Box className={classes.root}>
      <LanguageSelect />
      {isAuthenticated && (
        <Button color="primary" startIcon={<LogoutIcon />} onClick={logout}>
          <Trans i18nKey={'header.logout'} />
        </Button>
      )}
      {!isAuthenticated && (
        <Button color="primary" startIcon={<LoginIcon />} onClick={redirectToLogin}>
          <Trans i18nKey={'header.login'} />
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" startIcon={<SignUpIcon />} onClick={redirectToRegistration}>
          <Trans i18nKey={'header.signup'} />
        </Button>
      )}
    </Box>
  );
};

export default compose(connector, withTranslation(), withRouter)(HorizontalMenu);
