import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {ChatDialogContext} from '../../contexts/dialog-contexts/chat-dialog-context';
import {Chat} from '../../../models/chat.model';
import {ChatDialogs} from '../../../components/chat/_router';
import ChatAddMembersDialog, {
  ChatAddMembersDialogProps,
  defaultChatAddMembersDialogProps,
} from '../../../components/chat/dialogs/chat-add-members-dialog';
import ChatCreateDialog, {
  ChatCreateDialogProps,
  defaultChatCreateDialogProps,
} from '../../../components/chat/dialogs/chat-create-dialog';
import {User} from '../../../models/user.model';
import ChatMembersDialog, {
  ChatMembersDialogProps,
  defaultChatMembersDialogProps,
} from '../../../components/chat/dialogs/chat-members-dialog';
import {Message} from '../../../models/message.model';
import ChatReactionsDialog, {
  ChatReactionDialogProps,
  defaultChatReactionDialogProps,
} from '../../../components/chat/dialogs/chat-reactions-dialog';
import ChatRenameDialog, {
  ChatRenameDialogProps,
  defaultChatRenameDialogProps,
} from '../../../components/chat/dialogs/chat-rename-dialog';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';

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
    showChatRenameDialog,
  };

  return (
    <ChatDialogContext.Provider value={context}>
      <Component {...props} />
    </ChatDialogContext.Provider>
  );
};

export default withChatDialogs;
