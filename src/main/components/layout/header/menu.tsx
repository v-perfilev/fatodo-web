import { IRootState } from '../../../shared/reducers';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './header.scss';

export interface IMenuState {
  accountMenuOpen: boolean;
}

export interface IMenuProps extends PropsFromRedux {
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  state: IMenuState = {
    accountMenuOpen: false
  };

  toggleAccountMenu = () => this.setState((state) => ( {accountMenuOpen: !state.accountMenuOpen} ));

  render() {
    const {accountMenuOpen} = this.state;
    const {authentication} = this.props;
    const isAuthenticated = authentication.account.empty;

    return (
      <div className="menu">
        {isAuthenticated
          ? <div className="button">Logout</div>
          : <div className="button" onClick={this.toggleAccountMenu}>Login</div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({authentication}: IRootState) => ( {
  authentication: authentication
} );
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(
  mapStateToProps
)(Menu);
