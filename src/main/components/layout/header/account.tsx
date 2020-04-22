import * as React from 'react';
import { IRootState } from '../../../shared/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../../shared/reducers/authentication';

export interface ILoginButtonProps extends PropsFromRedux {
}

class Account extends React.Component<ILoginButtonProps> {


  doIt = () => {
    const {login} = this.props;
    login(null);
  }

  render() {
    return (
      <div>
        <button onClick={this.doIt}/>
        eqwq
      </div>
    );
  }

}

const mapStateToProps = ({authentication}: IRootState) => ( {
  authentication: authentication
} );
const mapDispatchToProps = {login};

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(Account);
