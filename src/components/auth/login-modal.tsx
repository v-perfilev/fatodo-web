import { connect, ConnectedProps } from 'react-redux';
import * as React from 'react';
import { IRootState } from '../../store';
import {
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { slideDown } from '../../utils/animation.helpers';
import { theme } from '../../shared/theme';
import { compose } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LoginForm, { FormValues } from './login-form';
import { login, toggleLoginModal } from '../../store/actions/auth.actions';

const styles = (theme: Theme) => createStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 200,
    margin: 0,
    padding: theme.spacing(2),
    color: 'white',
    background: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
});

const initialValues: FormValues = {
  email: '',
  password: '',
}

class LoginModal extends React.Component<PropsFromRedux & WithStyles<typeof styles>> {
  render() {
    const { classes, authState, login } = this.props;
    const isModalOpen = authState.showLoginModal && !authState.account.empty;

    const toggleLoginModal = () => this.props.toggleLoginModal();

    return (
      <Dialog open={isModalOpen} onClose={toggleLoginModal} TransitionComponent={slideDown}>
        <DialogTitle disableTypography className={classes.header}>
          <AccountBoxIcon className={classes.icon}/>
          <Typography variant="h6">
            Sign in
          </Typography>
          <IconButton onClick={toggleLoginModal} className={classes.closeButton}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <LoginForm initial={initialValues} login={login}/>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ authState }: IRootState) => ({
  authState
});
const mapDispatchToProps = {
  toggleLoginModal, login
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
  withStyles(styles(theme)),
  connector
)(LoginModal);
