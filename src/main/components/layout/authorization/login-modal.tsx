import { login, toggleLoginModal } from '../../../shared/reducers/authentication';
import { connect, ConnectedProps } from 'react-redux';
import * as React from 'react';
import { IRootState } from '../../../shared/reducers';
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
import { slideDown } from '../../../shared/animations/slides';
import { theme } from '../../../config/theme';
import { compose } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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

interface ILoginModal extends PropsFromRedux, WithStyles<typeof styles> {
}

class LoginModal extends React.Component<ILoginModal> {
  render() {
    const {classes, authentication, login} = this.props;
    const isModalOpen = authentication.showLoginModal && !authentication.account.empty;

    const toggleLoginModal = () => this.props.toggleLoginModal();

    return (
      <Dialog open={isModalOpen} onClose={toggleLoginModal} TransitionComponent={slideDown}>
        <DialogTitle disableTypography className={classes.header}>
          <AccountBoxIcon className={classes.icon} />
          <Typography variant="h6">
            Sign in
          </Typography>
          <IconButton onClick={toggleLoginModal} className={classes.closeButton}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          Test
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({authentication}: IRootState) => ( {
  authentication: authentication
} );
const mapDispatchToProps = {
  toggleLoginModal, login
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
  withStyles(styles(theme)),
  connector
)(LoginModal);
