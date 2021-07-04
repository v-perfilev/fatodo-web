import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {ChatDialogContext} from '../../contexts/dialog-contexts/chat-dialog-context';
import {Chat} from '../../../models/chat.model';
import ChatAddMembersDialog, {
  ChatAddMembersDialogProps,
  defaultChatAddMembersDialogProps,
} from '../../../pages/chat/dialogs/chat-add-members-dialog';
import ChatCreateDialog, {
  ChatCreateDialogProps,
  defaultChatCreateDialogProps,
} from '../../../pages/chat/dialogs/chat-create-dialog';
import {User} from '../../../models/user.model';
import ChatMembersDialog, {
  ChatMembersDialogProps,
  defaultChatMembersDialogProps,
} from '../../../pages/chat/dialogs/chat-members-dialog';
import {Message} from '../../../models/message.model';
import ChatReactionsDialog, {
  ChatReactionDialogProps,
  defaultChatReactionDialogProps,
} from '../../../pages/chat/dialogs/chat-reactions-dialog';
import ChatRenameDialog, {
  ChatRenameDialogProps,
  defaultChatRenameDialogProps,
} from '../../../pages/chat/dialogs/chat-rename-dialog';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import ChatReadStatusesDialog, {
  ChatReadStatusesDialogProps,
  defaultChatReadStatusesDialogProps,
} from '../../../pages/chat/dialogs/chat-read-statuses-dialog';

enum ChatDialogs {
  ADD_MEMBERS = 'CHAT_ADD_MEMBERS_DIALOG',
  CREATE = 'CHAT_CREATE_DIALOG',
  MEMBERS = 'CHAT_MEMBERS_DIALOG',
  REACTIONS = 'CHAT_REACTIONS_DIALOG',
  READ_STATUSES = 'CHAT_READ_STATUSES_DIALOG',
  RENAME = 'CHAT_RENAME_DIALOG',
}

const withChatDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

  const showChatAddMembersDialog = useCallback(
    (chat: Chat): void => {
      const show = true;
      const close = (): void => updateDialogProps(ChatDialogs.ADD_MEMBERS, {show: false});
      const props = {chat, show, close} as ChatAddMembersDialogProps;
      setDialogProps(ChatDialogs.ADD_MEMBERS, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const showChatCreateDialog = useCallback((): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.CREATE);
    const props = {show, close} as ChatCreateDialogProps;
    setDialogProps(ChatDialogs.CREATE, props);
  }, [setDialogProps, clearDialogProps]);

  const showChatMembersDialog = useCallback(
    (chat: Chat, users: User[]): void => {
      const show = true;
      const close = (): void => updateDialogProps(ChatDialogs.MEMBERS, {show: false});
      const switchToAddMembers = (): void => {
        updateDialogProps(ChatDialogs.MEMBERS, {show: false});
        showChatAddMembersDialog(chat);
      };
      const props = {chat, users, show, close, switchToAddMembers} as ChatMembersDialogProps;
      setDialogProps(ChatDialogs.MEMBERS, props);
    },
    [setDialogProps, updateDialogProps, showChatAddMembersDialog]
  );

  const showChatReactionsDialog = useCallback(
    (message: Message, users: User[]): void => {
      const show = true;
      const close = (): void => updateDialogProps(ChatDialogs.REACTIONS, {show: false});
      const props = {message, users, show, close} as ChatReactionDialogProps;
      setDialogProps(ChatDialogs.REACTIONS, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const showChatReadStatusesDialog = useCallback(
    (message: Message, users: User[]): void => {
      const show = true;
      const close = (): void => updateDialogProps(ChatDialogs.READ_STATUSES, {show: false});
      const props = {message, users, show, close} as ChatReadStatusesDialogProps;
      setDialogProps(ChatDialogs.READ_STATUSES, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const showChatRenameDialog = useCallback(
    (chat: Chat, title: string): void => {
      const show = true;
      const close = (): void => updateDialogProps(ChatDialogs.RENAME, {show: false});
      const props = {chat, title, show, close} as ChatRenameDialogProps;
      setDialogProps(ChatDialogs.RENAME, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const initDialogs = (): void => {
    handleDialog(ChatDialogs.ADD_MEMBERS, ChatAddMembersDialog, defaultChatAddMembersDialogProps);
    handleDialog(ChatDialogs.CREATE, ChatCreateDialog, defaultChatCreateDialogProps);
    handleDialog(ChatDialogs.MEMBERS, ChatMembersDialog, defaultChatMembersDialogProps);
    handleDialog(ChatDialogs.REACTIONS, ChatReactionsDialog, defaultChatReactionDialogProps);
    handleDialog(ChatDialogs.READ_STATUSES, ChatReadStatusesDialog, defaultChatReadStatusesDialogProps);
    handleDialog(ChatDialogs.RENAME, ChatRenameDialog, defaultChatRenameDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showChatAddMembersDialog,
    showChatCreateDialog,
    showChatMembersDialog,
    showChatReactionsDialog,
    showChatReadStatusesDialog,
    showChatRenameDialog,
  };

  return (
    <ChatDialogContext.Provider value={context}>
      <Component {...props} />
    </ChatDialogContext.Provider>
  );
};

export default withChatDialogs;
