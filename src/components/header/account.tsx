import { IRootState } from '../../store';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { toggleLoginModal } from '../../store/actions/auth.actions';
import { compose } from 'redux';
import { theme } from '../../shared/theme';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  });

type Props = ConnectedProps<typeof connector> & WithStyles<typeof styles>;

const Account = ({ authState, toggleLoginModal, classes }: Props) => {
  const isAuthenticated = authState.account.empty;
  return (
    <Box className={classes.root}>
      {isAuthenticated && (
        <Button variant="contained" color="secondary">
          <PowerSettingsNewIcon className={classes.icon} /> Logout
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleLoginModal}>
          <AccessibilityNewIcon className={classes.icon} /> Sign up
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleLoginModal}>
          <ExitToAppIcon className={classes.icon} /> Sign in
        </Button>
      )}
    </Box>
  );
};

const mapStateToProps = ({ authState }: IRootState) => ({ authState });
const mapDispatchToProps = { toggleLoginModal };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector, withStyles(styles(theme)))(Account);
