import React, {FC, memo, useEffect, useMemo} from 'react';
import {Box, Container} from '@material-ui/core';
import {chatContentItemStyles} from './_styles';
import {MessageListItem} from '../../../../models/message.model';
import ChatContentMessage from '../chat-content-message';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import withAuthState from '../../../../shared/hocs/with-auth-state';
import {compose} from 'recompose';
import ChatContentDate from './chat-content-date';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import ChatService from '../../../../services/chat.service';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../_constants';

type BaseProps = {
  index: number;
  items: MessageListItem[];
  isVisible: boolean;
};

type Props = AuthState & BaseProps;

const ChatContentItem: FC<Props> = ({index, items, isVisible, account}: Props) => {
  const classes = chatContentItemStyles();
  let timerId;

  const message = items[index].message;
  const date = items[index].date;
  const isFirst = index === 0;

  const isIncomingMessage = useMemo((): boolean => {
    return MessageUtils.isIncomingMessage(message, account);
  }, [message, account]);
  const isRead = useMemo((): boolean => {
    return MessageUtils.isReadMessage(message, account);
  }, [message?.statuses, account]);

  const markAsRead = (): void => {
    ChatService.markMessageAsRead(message.id);
  };

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
    <Container maxWidth="md" className={classes.item}>
      {isFirst && <Box className={classes.spacer} />}
      {date && <ChatContentDate date={date} />}
      {message && (
        <ChatContentMessage
          message={message}
          reactions={message.reactions}
          statuses={message.statuses}
          account={account}
        />
      )}
    </Container>
  );
};

export default compose<Props, BaseProps>(memo, withAuthState)(ChatContentItem);
