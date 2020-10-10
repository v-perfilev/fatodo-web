import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {SnackbarKey, SnackbarProvider, useSnackbar, VariantType} from 'notistack';
import {AxiosResponse} from 'axios';
import {ResponseUtils} from '../utils/response.utils';
import {TranslationUtils} from '../utils/translation.utils';
import {SnackBuilder} from '../utils/builders/snack.builder';
import {SnackContext, SnackState} from '../contexts/snack-context';
import Snack from '../../models/snack.model';
import {snackStyles} from './_styles';
import {compose} from 'recompose';

const withSnack = (Component: ComponentType): FC => (props): ReactElement => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const enqueueSnack = (snack: Snack): SnackbarKey => {
    return enqueueSnackbar(snack.message, snack.options);
  };

  const closeSnack = (key: SnackbarKey): void => {
    closeSnackbar(key);
  };

  const getVariantFromStatus = (status: number): VariantType => {
    if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'info';
    }
  };

  const handleResponse = (
    response: AxiosResponse,
    allowedCodes: string[] | '*' = '*',
    excludedCodes: string[] | '' = ''
  ): SnackbarKey => {
    const feedbackCode = ResponseUtils.getFeedbackCode(response);
    const status = ResponseUtils.getStatus(response);
    const isFeedBackCorrect =
      feedbackCode &&
      (allowedCodes === '*' || allowedCodes.includes(feedbackCode)) &&
      (excludedCodes === '' || !excludedCodes.includes(feedbackCode));
    const isStatusCorrect = status && status < 500;
    const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
    const snack =
      isFeedBackCorrect && isStatusCorrect && message
        ? new SnackBuilder(message).setVariant(getVariantFromStatus(status)).build()
        : null;
    return snack ? enqueueSnack(snack) : null;
  };

  const handleCode = (code: string, variant: VariantType): SnackbarKey => {
    const message = TranslationUtils.getSnackTranslation(code);
    const snack = message ? new SnackBuilder(message).setVariant(variant).build() : null;
    return snack ? enqueueSnack(snack) : null;
  };

  const context = {handleResponse, handleCode, enqueueSnack, closeSnack};

  return (
    <SnackContext.Provider value={context}>
      <Component {...props} />
    </SnackContext.Provider>
  );
};

const withSnackProvider = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = snackStyles();
  return (
    <SnackbarProvider classes={classes} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
      <Component {...props} />
    </SnackbarProvider>
  );
};

export const withSnackContext = (Component: ComponentType<SnackState>): FC => (props): ReactElement => {
  return <SnackContext.Consumer>{(value): ReactElement => <Component {...props} {...value} />}</SnackContext.Consumer>;
};

export default compose(withSnackProvider, withSnack);
