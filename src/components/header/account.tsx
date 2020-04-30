import {RootState} from '../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box, createStyles, StyleRules, Theme, withStyles, WithStyles} from '@material-ui/core';
import {logout, toggleLoginModal} from '../../store/actions/auth.actions';
import {compose} from 'redux';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {useTranslation} from 'react-i18next';
import {AuthenticationState} from '../../store/rerducers/auth.reduser';

const mapStateToProps = ({authState}: RootState): {authState: AuthenticationState} => ({authState});
const mapDispatchToProps = {toggleLoginModal, logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

const styles = (theme: Theme): StyleRules<any> =>
  createStyles({
    root: {
      '& > *': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:first-child': {
          marginLeft: theme.spacing(0),
        },
        '&:last-child': {
          marginRight: theme.spacing(0),
        },
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  });

type Props = ConnectedProps<typeof connector> & WithStyles<typeof styles>;

const Account: FC<any> = ({authState, toggleLoginModal, logout, classes}: Props) => {
  const {t} = useTranslation();
  const isAuthenticated = authState.isAuthenticated;

  return (
    <Box className={classes.root}>
      {isAuthenticated && (
        <Button color="inherit" onClick={logout}>
          <PowerSettingsNewIcon className={classes.icon} />
          {t('header.logout')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="outlined" color="inherit" onClick={toggleLoginModal}>
          <ExitToAppIcon className={classes.icon} /> {t('header.signin')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleLoginModal}>
          <AccessibilityNewIcon className={classes.icon} />
          {t('header.signup')}
        </Button>
      )}
    </Box>
  );
};

export default compose(connector, withStyles(styles))(Account);
