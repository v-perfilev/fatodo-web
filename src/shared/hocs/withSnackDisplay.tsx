import React, {ComponentType, memo, useState} from 'react';
import {flowRight} from 'lodash';
import {useAppDispatch, useAppSelector} from '../../store/store';
import SnackSelectors from '../../store/snack/snackSelectors';
import {SnackActions} from '../../store/snack/snackActions';
import {ReduxSnack} from '../../models/Snack';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material';

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
    snackList.forEach(({message, variant, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        closeSnackbar(key);
      } else if (!displayedKeys.includes(key) && displayedMessages.includes(message)) {
        dispatch(SnackActions.removeSnack(key));
      } else if (!displayedKeys.includes(key)) {
        const onClose = (): void => dispatch(SnackActions.removeSnack(key));
        enqueueSnackbar(message, {key, variant, onClose});
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
  const classes = snackClasses();
  return (
    <SnackbarProvider
      classes={classes}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      autoHideDuration={7000}
      preventDuplicate
    >
      <Component {...props} />
    </SnackbarProvider>
  );
};

export const snackClasses = makeStyles((theme: Theme) => ({
  variantInfo: {
    backgroundColor: theme.palette.info.main + ' !important',
  },
  variantWarning: {
    backgroundColor: theme.palette.warning.main + ' !important',
  },
  variantError: {
    backgroundColor: theme.palette.error.main + ' !important',
  },
}));

export default flowRight([memo, withSnackProvider, withSnackDisplay]);
