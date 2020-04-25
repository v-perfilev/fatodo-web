import { IRootState } from '../../store';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { toggleLoginModal } from '../../store/actions/auth.actions';

class Account extends React.Component<PropsFromRedux> {

  toggleLoginModal = () => this.props.toggleLoginModal();

  render() {
    const { authState } = this.props;
    const isAuthenticated = authState.account.empty;

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

const mapStateToProps = ({ authState }: IRootState) => ({
  authState
});
const mapDispatchToProps = {
  toggleLoginModal
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Account);
