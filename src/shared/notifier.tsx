import {SnackbarKey, useSnackbar} from 'notistack';
import {FC, useEffect, useState} from 'react';
import {RootState} from '../store';
import {connect, ConnectedProps} from 'react-redux';
import {removeSnackbar} from '../store/actions/notification.actions';
import {NotificationState} from '../store/rerducers/notification.reduser';

const mapStateToProps = ({notificationState}: RootState): {notificationState: NotificationState} => ({
  notificationState,
});
const mapDispatchToProps = {removeSnackbar};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Notifier: FC<any> = ({notificationState, removeSnackbar}: Props) => {
  const [displayed, setDisplayed] = useState<SnackbarKey[]>([]);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const addDisplayed = (key: SnackbarKey): void => setDisplayed([...displayed, key]);
  const removeDisplayed = (key: SnackbarKey): void => setDisplayed(displayed.filter((k) => k !== key));

  useEffect(() => {
    notificationState.list.forEach(({message, options, key, dismissed = false}) => {
      if (dismissed) {
        closeSnackbar(key);
      } else if (!displayed.includes(key)) {
        enqueueSnackbar(message, {...options, key, onExited: () => removeSnackbar(key)});
        addDisplayed(key);
      }
    });
    const keyList = notificationState.list.map((l) => l.key);
    displayed.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  });

  return null;
};

export default connector(Notifier);
