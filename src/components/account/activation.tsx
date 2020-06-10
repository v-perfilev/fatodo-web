import {FC, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import AccountService from '../../services/account.service';
import {Routes} from '../router';
import {compose} from 'recompose';
import {NotificationUtils} from '../../shared/utils/notification.utils';
import {enqueueSnackbar} from '../../store/actions/notification.actions';
import {connect, ConnectedProps} from 'react-redux';

const mapDispatchToProps = {enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = RouteComponentProps<{code: string}> & ConnectedProps<typeof connector>;

const Activation: FC<Props> = ({match, history, enqueueSnackbar}: Props) => {
  const code = match.params.code;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  useEffect(() => {
    AccountService.activate(code)
      .then(() => {
        NotificationUtils.handleSnack('auth.activated', 'info', enqueueSnackbar);
        redirectToHome();
      })
      .catch(() => {
        redirectToInternalError();
      });
  }, []);

  return null;
};

export default compose(withRouter, connector)(Activation);
