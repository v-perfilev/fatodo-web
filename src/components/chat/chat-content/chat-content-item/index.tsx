import React, {FC, HTMLAttributes, useMemo} from 'react';
import {Box, Container} from '@material-ui/core';
import {chatContentItemStyles} from './_styles';
import {Message, MessageListItem} from '../../../../models/message.model';
import ChatContentMessage from '../chat-content-message';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import withAuthState from '../../../../shared/hocs/with-auth-state';
import {compose} from 'recompose';
import ChatContentDate from './chat-content-date';

type BaseProps = HTMLAttributes<HTMLElement> & {
  item: MessageListItem;
  isFirst: boolean;
  isVisible: boolean;
};

type Props = AuthState & BaseProps;

const ChatContentItem: FC<Props> = ({item, isFirst, isVisible, account, style}: Props) => {
  const classes = chatContentItemStyles();

  const message = useMemo((): Message => item.message, [item]);
  const date = useMemo((): string => item.date, [item]);

  return (
    <div style={style}>
      <Container maxWidth="md">
        {isFirst && <Box className={classes.spacer} />}
        {date && <ChatContentDate date={date} />}
        {message && <ChatContentMessage message={message} account={account} isVisible={isVisible} />}
      </Container>
    </div>
  );
};

export default compose<Props, BaseProps>(withAuthState)(ChatContentItem);
