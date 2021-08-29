import React, {FC, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentFooterStyles} from './_styles';
import ChatContentInput from './chat-content-input';
import ChatContentSendButton from './chat-content-send-button';
import {MessageDTO} from '../../../../models/dto/message.dto';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message} from '../../../../models/message.model';
import {User} from '../../../../models/user.model';
import {RandomUtils} from '../../../../shared/utils/random.utils';
import {NEW_MESSAGES_PREFIX} from '../../_constants';

type Props = {
  chatId: string;
  account: User;
  addMessage: (message: Message) => void;
};

const ChatContentFooter: FC<Props> = ({chatId, account, addMessage}: Props) => {
  const classes = chatContentFooterStyles();
  const {handleResponse} = useSnackContext();
  const [messageBody, setMessageBody] = useState<string>('');

  const message = useMemo<Message>(
    () => ({
      id: NEW_MESSAGES_PREFIX + RandomUtils.generate().toString(),
      chatId,
      userId: account.id,
      text: messageBody,
      forwardedMessage: null,
      isDeleted: false,
      isEvent: false,
      statuses: [],
      reactions: [],
      createdAt: new Date().getTime(),
      createdBy: account.id,
    }),
    [messageBody]
  );

  const dto = useMemo<MessageDTO>(
    () => ({
      text: messageBody,
      forwardedMessageId: null,
    }),
    [messageBody]
  );

  const send = (): void => {
    if (messageBody.trim().length > 0) {
      addMessage(message);
      setMessageBody('');
      ChatService.sendIndirectMessage(chatId, dto).catch(handleResponse);
    }
  };

  return (
    <Box className={classes.root}>
      <ChatContentInput send={send} message={messageBody} setMessage={setMessageBody} />
      <ChatContentSendButton send={send} />
    </Box>
  );
};

export default ChatContentFooter;
