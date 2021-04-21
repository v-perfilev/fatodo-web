import * as React from 'react';
import {FC, useEffect} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import MessageMain from './chat-main';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import {useDialogsContext} from '../../shared/contexts/dialogs-context';
import ChatAddMembersDialog, {defaultChatAddMembersDialogProps} from './dialogs/chat-add-members-dialog';
import ChatCreateDialog, {defaultChatCreateDialogProps} from './dialogs/chat-create-dialog';
import ChatMembersDialog, {defaultChatMembersDialogProps} from './dialogs/chat-members-dialog';
import ChatReactionsDialog, {defaultChatReactionDialogProps} from './dialogs/chat-reactions-dialog';
import ChatRenameDialog, {defaultChatRenameDialogProps} from './dialogs/chat-rename-dialog';

export enum ChatDialogs {
  ADD_MEMBERS = 'CHAT_ADD_MEMBERS_DIALOG',
  CREATE = 'CHAT_CREATE_DIALOG',
  MEMBERS = 'CHAT_MEMBERS_DIALOG',
  REACTIONS = 'CHAT_REACTIONS_DIALOG',
  RENAME = 'CHAT_RENAME_DIALOG'
}

export enum ChatRoutes {
  CHAT = '/:chatId',
}

const ChatRouter: FC = () => {
  const {handleDialog} = useDialogsContext();
  const match = useRouteMatch();

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

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={MessageMain} />
      <PublicRoute exact path={match.path + ChatRoutes.CHAT} component={MessageMain} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu, withUserList)(ChatRouter);
