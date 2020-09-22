import {FC, useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import AccountService from '../../../services/account.service';
import {Routes} from '../../router';
import {Notification} from '../../../shared/notification/notification';

const Activation: FC = () => {
  const match = useRouteMatch<{code: string}>();
  const history = useHistory();
  const code = match.params.code;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  useEffect(() => {
    AccountService.activate(code)
      .then(() => {
        Notification.handleSnack('auth.activated', 'info');
        redirectToHome();
      })
      .catch(() => {
        redirectToInternalError();
      });
  }, []);

  return null;
};

export default Activation;
