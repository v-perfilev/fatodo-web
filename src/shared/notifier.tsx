import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IRootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { removeSnackbar } from '../store/actions/notification.actions';

type Props = ConnectedProps<typeof connector>;

const Notifier = ({ notificationState, removeSnackbar }: Props) => {
  const [displayed, setDisplayed] = useState<SnackbarKey[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => handlingLoop());

  const addDisplayed = (key: SnackbarKey) => setDisplayed([...displayed, key]);
  const removeDisplayed = (key: SnackbarKey) => setDisplayed(displayed.filter(k => k != key));

  const handlingLoop = () => {
    notificationState.list.forEach(({ message, options, key, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key);
      } else if (!displayed.includes(key)) {
        enqueueSnackbar(message, { ...options, key, onExited: () => removeSnackbar(key) });
        addDisplayed(key);
      }
    });
    const keyList = notificationState.list.map(l => l.key);
    displayed.filter(key => !keyList.includes(key)).forEach(removeDisplayed);
  }

  return null;
}

const mapStateToProps = ({ notificationState }: IRootState) => ({ notificationState });
const mapDispatchToProps = { removeSnackbar };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Notifier)
