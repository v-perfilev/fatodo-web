import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Chat} from '../../models/Chat';
import {ChatItem, Message} from '../../models/Message';

const getChatState = (state: RootState) => state.chat;

class ChatSelectors {
  static chatId = createSelector(getChatState, (state) => state.chatId as string);

  static chat = createSelector(getChatState, (state) => state.chat as Chat);

  static messages = createSelector(getChatState, (state) => state.messages as Message[]);

  static chatItems = createSelector(getChatState, (state) => state.chatItems as ChatItem[]);

  static allLoaded = createSelector(getChatState, (state) => state.allLoaded as boolean);

  static loading = createSelector(getChatState, (state) => state.loading as boolean);
}

export default ChatSelectors;
