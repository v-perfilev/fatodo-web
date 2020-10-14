import {FC, useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Routes} from '../../router';
import {compose} from 'recompose';
import {connect, ConnectedProps} from 'react-redux';
import {login, requestAccountData} from '../../../store/actions/auth.actions';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const SocialLogin: FC<Props> = ({login, requestAccountData}: Props) => {
  const history = useHistory();
  const match = useRouteMatch<{token: string}>();
  const token = match.params.token;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  useEffect(() => {
    if (token) {
      login(token, true);
      requestAccountData(redirectToHome, redirectToInternalError);
    } else {
      redirectToInternalError();
    }
  }, []);

  return null;
};

export default compose(connector)(SocialLogin);
