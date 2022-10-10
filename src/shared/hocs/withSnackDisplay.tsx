import * as React from 'react';
import {ComponentType, memo, useState} from 'react';
import {flowRight} from 'lodash';
import {useAppDispatch, useAppSelector} from '../../store/store';
import SnackSelectors from '../../store/snack/snackSelectors';
import {SnackActions} from '../../store/snack/snackActions';
import {ReduxSnack} from '../../models/Snack';
import {SnackbarProvider, useSnackbar} from 'notistack';

const withSnackDisplay = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const snackList = useAppSelector(SnackSelectors.list);
  const [displayed, setDisplayed] = useState<Map<string, string>>(new Map());
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const addDisplayed = (key: string, message: string): void =>
    setDisplayed((prevState) => {
      prevState.set(key, message);
      return new Map([...prevState]);
    });
  const removeDisplayed = (key: string): void =>
    setDisplayed((prevState) => {
      prevState.delete(key);
      return new Map([...prevState]);
    });
  const displayedKeys = Array.from(displayed.keys());
  const displayedMessages = Array.from(displayed.values());

  const handleSnacks = (): void => {
    snackList.forEach(({message, color, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        closeSnackbar(key);
      } else if (!displayedKeys.includes(key) && displayedMessages.includes(message)) {
        dispatch(SnackActions.removeSnack(key));
      } else if (!displayedKeys.includes(key)) {
        const onCloseComplete = (): void => dispatch(SnackActions.removeSnack(key));
        enqueueSnackbar({
          title: message,
          borderColor: color,
          borderWidth: 1,
          _title: {color},
          id: key,
          onCloseComplete,
        });
        addDisplayed(key, message);
      }
    });
    const keyList = snackList.map((reduxSnack: ReduxSnack) => reduxSnack.key);
    displayedKeys.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  };

  handleSnacks();

  return <Component {...props} />;
};

const withSnackProvider = (Component: ComponentType) => (props: any) => {
  return (
    <SnackbarProvider anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={7000} preventDuplicate>
      <Component {...props} />
    </SnackbarProvider>
  );
};

export default flowRight([memo, withSnackProvider, withSnackDisplay]);
