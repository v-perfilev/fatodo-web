import React, {FC, HTMLAttributes, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {messageControlChatStyles} from './_styles';
import {UrlPic} from '../../common/images';
import {DateFormatters} from '../../../shared/utils/date.utils';
import csx from 'classnames';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {ChatUtils} from '../../../shared/utils/chat.utils';

type Props = HTMLAttributes<HTMLElement> & {
  chat: Chat;
  isSelected: boolean;
  account: User;
};

const MessageControlChat: FC<Props> = ({chat, isSelected, account, ...props}: Props) => {
  const classes = messageControlChatStyles();
  const {users, addIds} = useUserListContext();

  const title = ChatUtils.getTitle(chat, users, account);
  const date = DateFormatters.formatTimeAndDateWithYear(new Date(chat.lastMessage.createdAt));

  const classNames = csx(classes.root, {selected: isSelected});

  useEffect(() => {
    addIds(chat.members);
  }, []);

  return (
    <Box className={classNames} {...props}>
      <UrlPic className={classes.image} alt={null} url={null} size="lg" border={1} />
      <Box className={classes.chatContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.title}>{title}</Box>
          <Box className={classes.date}>{date}</Box>
        </Box>
        <Box className={classes.text}>{chat.lastMessage.text}</Box>
      </Box>
    </Box>
  );
};

export default MessageControlChat;
