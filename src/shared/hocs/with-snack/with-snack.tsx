import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {SnackbarKey, SnackbarProvider, useSnackbar, VariantType} from 'notistack';
import {AxiosResponse} from 'axios';
import {ResponseUtils} from '../../utils/response.utils';
import {TranslationUtils} from '../../utils/translation.utils';
import {SnackBuilder} from '../../utils/builders/snack.builder';
import {SnackContext, SnackState} from '../../contexts/snack-context';
import Snack from '../../../models/snack.model';
import {snackStyles} from './_styles';
import {compose} from 'recompose';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../store';
import {closeReduxSnack, enqueueReduxSnack, removeReduxSnack} from '../../../store/actions/snack.actions';
import {ReduxSnack} from '../../../store/rerducers/snack.reducer';

const mapStateToProps = (state: RootState): any => ({snackState: state.snackState});
const mapDispatchToProps = {enqueueReduxSnack, closeReduxSnack, removeReduxSnack};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & PropsWithChildren<any>;

const withSnack = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {snackState, enqueueReduxSnack, closeReduxSnack, removeReduxSnack, ...restProps} = props;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [displayed, setDisplayed] = useState<SnackbarKey[]>([]);

  const enqueueSnack = (snack: Snack): SnackbarKey => enqueueReduxSnack(snack);
  const closeSnack = (key: SnackbarKey): void => closeReduxSnack(key);

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
    const snack = isFeedBackCorrect && isStatusCorrect && message
      ? new SnackBuilder(message).setVariant(getVariantFromStatus(status)).build()
      : null;
    return snack ? enqueueSnack(snack) : null;
  };

  const handleCode = (code: string, variant: VariantType): SnackbarKey => {
    const message = TranslationUtils.getSnackTranslation(code);
    const snack = message ? new SnackBuilder(message).setVariant(variant).build() : null;
    return snack ? enqueueSnack(snack) : null;
  };

  const addDisplayed = (key: SnackbarKey): void =>
    setDisplayed((prevState) => [...prevState, key]);
  const removeDisplayed = (key: SnackbarKey): void =>
    setDisplayed((prevState) => prevState.filter((k) => k !== key));

  useEffect(() => {
    snackState.list.forEach(({message, options, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        closeSnackbar(key);
      } else if (!displayed.includes(key)) {
        enqueueSnackbar(message, {...options, key, onExited: () => removeReduxSnack(key)});
        addDisplayed(key);
      }
    });
    const keyList = snackState.list.map((l) => l.key);
    displayed.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  });


  const context = {handleResponse, handleCode, enqueueSnack, closeSnack};

  return (
    <SnackContext.Provider value={context}>
      <Component {...restProps} />
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

export const withSnackContext = (Component: ComponentType<SnackState>): FC =>
  (props): ReactElement => {
    return (
      <SnackContext.Consumer>
        {(value): ReactElement => <Component {...props} {...value} />}
      </SnackContext.Consumer>
    );
  };

export default compose(withSnackProvider, connector, withSnack);
