import {createContext, useContext} from 'react';
import {WsState} from './types';

export const WsContext = createContext<WsState>(null);
export const useWsContext = (): WsState => useContext(WsContext);
