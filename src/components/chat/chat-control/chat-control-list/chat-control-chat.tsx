import React, {FC, HTMLAttributes, memo, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {Chat} from '../../../../models/chat.model';
import {chatControlChatStyles} from './_styles';
import ChatControlMessage from '../chat-control-message';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import csx from 'classnames';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {ChatUtils} from '../../../../shared/utils/chat.utils';
import {UrlPic} from '../../../common/images';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {SoloBadge} from '../../../common/surfaces';
import {useTranslation} from 'react-i18next';

type Props = HTMLAttributes<HTMLElement> & {
  index: number;
  chats: Chat[];
  isSelected: boolean;
  account: User;
};

const ChatControlChat: FC<Props> = ({index, chats, isSelected, account, ...props}: Props) => {
  const classes = chatControlChatStyles();
  const {users, handleUserIds} = useUserListContext();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const {t} = useTranslation();

  const chat = chats[index];
  const unreadCount = unreadMessageCountMap?.get(chat.id);
  const title = ChatUtils.getTitle(chat, users, account);
  const date = chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;
  const formattedDate = date ? DateFormatters.formatTimeAndDateWithYear(date) : null;

  const classNames = csx(classes.root, {selected: isSelected});

  useEffect(() => {
    handleUserIds(chat?.members);
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
          <Box className={classes.title}>
            {title}
            {chat.isDirect && <Box className={classes.direct}>{t('chat:common.direct')}</Box>}
          </Box>
          <Box className={classes.date}>{formattedDate}</Box>
        </Box>
        <Box className={classes.text}>
          <ChatControlMessage message={chat.lastMessage} account={account} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ChatControlChat);
