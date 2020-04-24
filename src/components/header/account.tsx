import { IRootState } from '../../redux';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { toggleLoginModal } from '../../redux/actions/auth-actions';

class Account extends React.Component<PropsFromRedux> {

  toggleLoginModal = () => this.props.toggleLoginModal();

  render() {
    const {authentication} = this.props;
    const isAuthenticated = authentication.account.empty;

    return (
      <Box>
        {isAuthenticated
          ? <Button variant="contained" color="secondary">Logout</Button>
          : <Button variant="contained" color="secondary" onClick={this.toggleLoginModal}>Login</Button>
        }
      </Box>
    )
  }
}

const mapStateToProps = ({authentication}: IRootState) => ( {
  authentication: authentication
} );
const mapDispatchToProps = {
  toggleLoginModal
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Account);
