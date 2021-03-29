import {createContext, useContext} from 'react';
import {WsMessagesState} from './types';

export const WsMessagesContext = createContext<WsMessagesState>(null);
export const useWsMessagesContext = (): WsMessagesState => useContext(WsMessagesContext);
