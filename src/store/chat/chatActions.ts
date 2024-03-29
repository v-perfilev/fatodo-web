import chatSlice from './chatSlice';
import {Chat, ChatMember} from '../../models/Chat';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import {accountToUser, UserAccount} from '../../models/User';
import {
  buildEventMessage,
  buildMessageFromDTO,
  buildMessageReaction,
  buildMessageStatus,
  EventMessageType,
  Message,
  MessageReaction,
  MessageStatus,
} from '../../models/Message';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {MessageUtils} from '../../shared/utils/MessageUtils';
import {InfoActions} from '../info/infoActions';
import {SnackActions} from '../snack/snackActions';
import {ChatsActions} from '../chats/chatsActions';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PageableList} from '../../models/PageableList';
import {ChatRenameDTO} from '../../models/dto/ChatRenameDTO';
import {v4 as uuidV4} from 'uuid';

const PREFIX = 'chat/';

export class ChatActions {
  static afterLogout = () => (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.reset());
  };

  static reset = () => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.reset());
  };

  static removeChat = (chatId: string) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.removeChat(chatId));
  };

  static updateChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateChat(chat));
  };

  static addMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMembers(members));
  };

  static removeMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.removeMembers(members));
  };

  static updateMessage = (message: Message, account: UserAccount) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessages({messages: [message], account}));
  };

  static setMessageReaction = (reaction: MessageReaction, account: UserAccount) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessageReaction({reaction, account}));
  };

  static setMessageStatus = (status: MessageStatus, account: UserAccount) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessageStatus({status, account}));
  };

  static fetchChatThunk = createAsyncThunk<Chat, string, AsyncThunkConfig>(
    PREFIX + 'fetchChat',
    async (chatId, thunkAPI) => {
      const response = await ChatService.getChatById(chatId);
      const chatUserIds = ChatUtils.extractUserIds([response.data]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
      await thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId, offset: 0}));
      return response.data;
    },
  );

  static fetchMessagesThunk = createAsyncThunk<
    {list: PageableList<Message>; account: UserAccount},
    {chatId: string; offset: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchMessages', async ({chatId, offset}, thunkAPI) => {
    const account = thunkAPI.getState().auth.account;
    const response = await ChatService.getAllMessagesByChatIdPageable(chatId, offset);
    const messages = response.data.data;
    const messageUserIds = MessageUtils.extractUserIds(messages);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(messageUserIds));
    return {list: response.data, account};
  });

  static refreshMessagesThunk = createAsyncThunk<
    {list: PageableList<Message>; account: UserAccount},
    string,
    AsyncThunkConfig
  >(PREFIX + 'refreshMessages', async (chatId, thunkAPI) => {
    const account = thunkAPI.getState().auth.account;
    const response = await ChatService.getAllMessagesByChatIdPageable(chatId);
    const messages = response.data.data;
    const messageUserIds = MessageUtils.extractUserIds(messages);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(messageUserIds));
    return {list: response.data, account};
  });

  static markMessageAsReadThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'markMessageAsRead',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const status = buildMessageStatus(message.chatId, message.id, account.id, 'READ');
      thunkAPI.dispatch(chatSlice.actions.setMessageStatus({status, account}));
      thunkAPI.dispatch(ChatsActions.removeUnreadMessage(message));
      ChatService.markMessageAsRead(message.id);
    },
  );

  static markChatAsReadThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'markChatAsRead',
    async (chat, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const messages = thunkAPI.getState().chat.messages;
      const user = accountToUser(account);
      messages
        .filter((message) => !MessageUtils.isReadMessage(message, user))
        .forEach((message) => {
          const status = buildMessageStatus(message.chatId, message.id, account.id, 'READ');
          thunkAPI.dispatch(chatSlice.actions.setMessageStatus({status, account}));
        });
      thunkAPI.dispatch(ChatsActions.removeUnreadChat(chat.id));
      ChatService.markChatAsRead(chat.id);
    },
  );

  static noReactionThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'noReaction',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'NONE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({reaction, account}));
      ChatService.noneMessageReaction(message.id);
    },
  );

  static likeReactionThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'likeReaction',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'LIKE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({reaction, account}));
      ChatService.likeMessageReaction(message.id);
    },
  );

  static dislikeReactionThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'dislikeReaction',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'DISLIKE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({reaction, account}));
      ChatService.dislikeMessageReaction(message.id);
    },
  );

  static renameChatThunk = createAsyncThunk<void, {chat: Chat; dto: ChatRenameDTO}, AsyncThunkConfig>(
    PREFIX + 'renameChat',
    async ({chat, dto}, thunkAPI) => {
      await ChatService.renameChat(chat.id, dto);
      thunkAPI.dispatch(SnackActions.handleCode('chat.renamed', 'info'));
    },
  );

  static clearChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'clearChat',
    async (chat, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      await ChatService.clearChat(chat.id);
      const message = buildEventMessage(chat.id, undefined, EventMessageType.CLEAR_CHAT, undefined);
      thunkAPI.dispatch(chatSlice.actions.resetMessages());
      thunkAPI.dispatch(chatSlice.actions.setMessages({messages: [message], account}));
      thunkAPI.dispatch(ChatsActions.setChatLastMessageAction(message));
      thunkAPI.dispatch(ChatsActions.removeUnreadChat(message.chatId));
      thunkAPI.dispatch(SnackActions.handleCode('chat.cleared', 'info'));
    },
  );

  static leaveChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'leaveChat',
    async (chat, thunkAPI) => {
      await ChatService.leaveChat(chat.id);
      thunkAPI.dispatch(ChatsActions.removeChat(chat.id));
      thunkAPI.dispatch(SnackActions.handleCode('chat.left', 'info'));
    },
  );

  static deleteChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'deleteChat',
    async (chat, thunkAPI) => {
      await ChatService.deleteChat(chat.id);
      thunkAPI.dispatch(ChatsActions.removeChat(chat.id));
      thunkAPI.dispatch(SnackActions.handleCode('chat.deleted', 'info'));
    },
  );

  static addChatMembersThunk = createAsyncThunk<void, {chat: Chat; userIds: string[]}, AsyncThunkConfig>(
    PREFIX + 'addChatMembers',
    async ({chat, userIds}, thunkAPI) => {
      await ChatService.addUsersToChat(chat.id, userIds);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
    },
  );

  static removeChatMemberThunk = createAsyncThunk<void, {chat: Chat; userId: string}, AsyncThunkConfig>(
    PREFIX + 'removeChatMember',
    async ({chat, userId}, thunkAPI) => {
      await ChatService.removeUsersFromChat(chat.id, [userId]);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
    },
  );

  static sendMessageThunk = createAsyncThunk<void, {chatId: string; dto: MessageDTO}, AsyncThunkConfig>(
    PREFIX + 'sendMessage',
    async ({chatId, dto}, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const id = uuidV4();
      const message = buildMessageFromDTO(dto, id, chatId, account.id);
      thunkAPI.dispatch(chatSlice.actions.addCreatedId(id));
      thunkAPI.dispatch(chatSlice.actions.setMessages({messages: [message], account}));
      ChatService.sendIndirectMessage(chatId, dto);
    },
  );

  static editMessageThunk = createAsyncThunk<void, {message: Message; dto: MessageDTO}, AsyncThunkConfig>(
    PREFIX + 'editMessage',
    async ({message, dto}, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const editedMessage = {...message, ...dto} as Message;
      thunkAPI.dispatch(chatSlice.actions.setMessages({messages: [editedMessage], account}));
      await ChatService.editMessage(message.id, dto);
      thunkAPI.dispatch(SnackActions.handleCode('chat.messageEdited', 'info'));
    },
  );

  static deleteMessageThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'deleteMessage',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      const deletedMessage = {...message, isDeleted: true} as Message;
      thunkAPI.dispatch(chatSlice.actions.setMessages({messages: [deletedMessage], account}));
      await ChatService.deleteMessage(message.id);
      thunkAPI.dispatch(SnackActions.handleCode('chat.messageDeleted', 'info'));
    },
  );

  static addMessageThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'addMessage',
    async (message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      if (message.userId === account.id) {
        const messages = thunkAPI.getState().chat.messages;
        const createdIds = thunkAPI.getState().chat.createdIds;
        const stubMessage = messages.find(
          (m) => m.userId === account.id && createdIds.includes(m.id) && m.text === message.text,
        );
        if (stubMessage) {
          thunkAPI.dispatch(chatSlice.actions.removeCreatedId(stubMessage.id));
          thunkAPI.dispatch(chatSlice.actions.removeMessage(stubMessage));
        }
      }
      thunkAPI.dispatch(chatSlice.actions.setMessages({messages: [message], account}));
    },
  );
}
