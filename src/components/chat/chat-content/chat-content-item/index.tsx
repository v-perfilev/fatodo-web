import React, {FC, useCallback, useEffect, useMemo} from 'react';
import {Container} from '@material-ui/core';
import {chatContentItemStyles} from './_styles';
import {Message, MessageListItem} from '../../../../models/message.model';
import ChatContentMessage from '../chat-content-message';
import ChatContentDate from './chat-content-date';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import ChatService from '../../../../services/chat.service';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../_constants';
import ChatContentSpacer from './chat-content-spacer';
import {User} from '../../../../models/user.model';

type Props = {
  item: MessageListItem;
  isVisible: boolean;
  account: User;
};

const ChatContentItem: FC<Props> = ({item, isVisible, account}: Props) => {
  const classes = chatContentItemStyles();
  let timerId;

  const message = useMemo<Message>(() => {
    return item.message;
  }, [item]);

  const date = useMemo<string>(() => {
    return item.date;
  }, [item]);

  const isIncomingMessage = useMemo<boolean>((): boolean => {
    return MessageUtils.isIncomingMessage(message, account);
  }, [message, account]);

  const isRead = useMemo<boolean>((): boolean => {
    return MessageUtils.isReadMessage(message, account);
  }, [message?.statuses, account]);

  const markAsRead = useCallback((): void => {
    ChatService.markMessageAsRead(message.id);
  }, [message?.id]);

  const markAsReadIfNeeded = (): void => {
    if (isVisible) {
      timerId = window.setTimeout(() => markAsRead(), TIMEOUT_BEFORE_MARK_AS_READ);
    } else {
      window.clearTimeout(timerId);
    }
  };

  useEffect(() => {
    if (isIncomingMessage && !isRead) {
      markAsReadIfNeeded();
    }
  }, [isVisible]);

  return (
    <Container maxWidth="md" className={classes.root}>
      {!date && !message && <ChatContentSpacer />}
      {date && <ChatContentDate date={date} />}
      {message && <ChatContentMessage message={message} account={account} />}
    </Container>
  );
};

export default ChatContentItem;
