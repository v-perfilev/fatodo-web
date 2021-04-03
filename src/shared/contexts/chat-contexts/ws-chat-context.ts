import {createContext, useContext} from 'react';
import {WsChatState} from './types';

export const WsChatContext = createContext<WsChatState>(null);
export const useWsChatContext = (): WsChatState => useContext(WsChatContext);
