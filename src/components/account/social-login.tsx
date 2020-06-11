import {FC, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../router';
import {compose} from 'recompose';
import {connect, ConnectedProps} from 'react-redux';
import {login} from '../../store/actions/auth.actions';

const mapDispatchToProps = {login};
const connector = connect(null, mapDispatchToProps);

type Props = RouteComponentProps<{token: string}> & ConnectedProps<typeof connector>;

const SocialLogin: FC<Props> = ({match, history, login}: Props) => {
  const token = match.params.token;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  useEffect(() => {
    if (token) {
      login(token, true, redirectToHome, redirectToInternalError);
    } else {
      redirectToInternalError();
    }
  }, []);

  return null;
};

export default compose(withRouter, connector)(SocialLogin);
