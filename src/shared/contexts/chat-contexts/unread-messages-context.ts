import {createContext, useContext} from 'react';
import {UnreadMessagesState} from './types';

export const UnreadMessagesContext = createContext<UnreadMessagesState>(null);
export const useUnreadMessagesContext = (): UnreadMessagesState => useContext(UnreadMessagesContext);
