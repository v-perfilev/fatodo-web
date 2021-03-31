import React, {FC, HTMLAttributes, memo, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {Chat} from '../../../../models/chat.model';
import {messageControlChatStyles} from './_styles';
import MessageControlBox from '../message-control-box';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import csx from 'classnames';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {ChatUtils} from '../../../../shared/utils/chat.utils';
import {UrlPic} from '../../../common/images';
import {useUnreadMessagesContext} from '../../../../shared/contexts/messenger-contexts/unread-messages-context';
import {SoloBadge} from '../../../common/surfaces';

type Props = HTMLAttributes<HTMLElement> & {
  chat: Chat;
  isSelected: boolean;
  account: User;
};

const MessageControlChat: FC<Props> = ({chat, isSelected, account, ...props}: Props) => {
  const classes = messageControlChatStyles();
  const {users, handleUserIds} = useUserListContext();
  const {unreadMessageCountMap} = useUnreadMessagesContext();

  const unreadCount = unreadMessageCountMap?.get(chat.id);
  const title = ChatUtils.getTitle(chat, users, account);
  const date = chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;
  const formattedDate = date ? DateFormatters.formatTimeAndDateWithYear(date) : null;

  const classNames = csx(classes.root, {selected: isSelected});

  useEffect(() => {
    handleUserIds(chat.members);
  }, []);

  return (
    <Box className={classNames} {...props}>
      <UrlPic className={classes.image} alt={null} url={null} size="lg" border={1} />
      <Box className={classes.chatContainer}>
        <Box className={classes.topContainer}>
          {unreadCount > 0 && (
            <Box className={classes.badge}>
              <SoloBadge badgeContent={unreadCount} color="primary" />
            </Box>
          )}
          <Box className={classes.title}>{title}</Box>
          <Box className={classes.date}>{formattedDate}</Box>
        </Box>
        <Box className={classes.text}>
          <MessageControlBox message={chat.lastMessage} account={account} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(MessageControlChat);
