import {createContext, useContext} from 'react';
import {WsCommentState} from './types';

export const WsCommentContext = createContext<WsCommentState>(null);
export const useWsCommentContext = (): WsCommentState => useContext(WsCommentContext);
