import {createContext, useContext} from 'react';
import {Chat} from '../../../models/chat.model';
import {Message} from '../../../models/message.model';

export interface WsMessagesState {
  chatEvent: Chat;
  messageEvent: Message;
}

export const WsMessagesContext = createContext<WsMessagesState>(null);
export const useWsMessagesContext = (): WsMessagesState => useContext(WsMessagesContext);
