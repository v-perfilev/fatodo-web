import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {chatContentHeaderStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import ChatContentActions from './chat-content-actions';
import {ChatUtils} from '../../../../shared/utils/chat.utils';
import {User} from '../../../../models/user.model';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import ChatContentMembers from '../chat-content-members';
import {useTranslation} from 'react-i18next';

type Props = {
  chat: Chat;
  account: User;
  openMembersDialog: () => void;
  openAddMembersDialog: () => void;
  openRenameDialog: () => void;
  closeChat: () => void;
  clearMessages: () => void;
};

const ChatContentHeader: FC<Props> = (props: Props) => {
  const {chat, account} = props;
  const {openMembersDialog, openAddMembersDialog, openRenameDialog, closeChat, clearMessages} = props;
  const classes = chatContentHeaderStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();

  const title = ChatUtils.getTitle(chat, users, account);

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        {title}
        {chat.isDirect && (
          <Box className={classes.direct}>{t('chat:common.direct')}</Box>
        )}
      </Box>
      <ChatContentMembers
        chat={chat}
        openMembersDialog={openMembersDialog}
      />
      <ChatContentActions
        chat={chat}
        openMembersDialog={openMembersDialog}
        openAddMembersDialog={openAddMembersDialog}
        openRenameDialog={openRenameDialog}
        closeChat={closeChat}
        clearMessages={clearMessages}
      />
    </Box>
  );
};

export default ChatContentHeader;
