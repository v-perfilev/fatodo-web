import {RootState} from '../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box} from '@material-ui/core';
import {logout} from '../../store/actions/auth.actions';
import {Trans, withTranslation} from 'react-i18next';
import {accountStyles} from './_styles';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {LoginIcon} from '../common/icons/login-icon';
import {LogoutIcon} from '../common/icons/logout-icon';
import {SignUpIcon} from '../common/icons/signup-icon';
import {compose} from 'recompose';
import {Routes} from '../router';
import Link from '../common/link';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Account: FC<Props> = ({authState: {isAuthenticated}, logout}: Props) => {
  const classes = accountStyles();

  return (
    <Box className={classes.root}>
      {isAuthenticated && (
        <Button color="primary" startIcon={<LogoutIcon />} onClick={logout}>
          <Trans i18nKey={'header.logout'} />
        </Button>
      )}
      {!isAuthenticated && (
        <Link to={Routes.LOGIN} underline="none">
          <Button color="primary" startIcon={<LoginIcon />}>
            <Trans i18nKey={'header.login'} />
          </Button>
        </Link>
      )}
      {!isAuthenticated && (
        <Link to={Routes.REGISTRATION} underline="none">
          <Button variant="contained" color="secondary" startIcon={<SignUpIcon />}>
            <Trans i18nKey={'header.register'} />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default compose(connector, withTranslation())(Account);
