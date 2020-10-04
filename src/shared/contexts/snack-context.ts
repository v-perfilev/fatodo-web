import {AxiosResponse} from 'axios';
import {SnackbarKey, VariantType} from 'notistack';
import Snack from '../../models/snack.model';
import * as React from 'react';
import {useContext} from 'react';

export interface SnackState {
  handleResponse: (response: AxiosResponse,
                   allowedCodes?: string[] | '*',
                   excludedCodes?: string[] | '') => SnackbarKey,
  handleCode: (code: string, variant: VariantType) => SnackbarKey,
  enqueueSnack: (snack: Snack) => SnackbarKey,
  closeSnack: (key: SnackbarKey) => void,
}

export const SnackContext = React.createContext<SnackState>(null);
export const SnackProvider = SnackContext.Provider;
export const SnackConsumer = SnackContext.Consumer;
export const useSnackContext = (): SnackState => useContext(SnackContext);
