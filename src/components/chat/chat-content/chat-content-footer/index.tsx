import React, {FC, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentFooterStyles} from './_styles';
import ChatContentInput from './chat-content-input';
import ChatContentSendButton from './chat-content-send-button';
import {MessageDTO} from '../../../../models/dto/message.dto';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';

type Props = {
  chatId: string;
};

const ChatContentFooter: FC<Props> = ({chatId}: Props) => {
  const classes = chatContentFooterStyles();
  const {handleResponse} = useSnackContext();
  const [message, setMessage] = useState<string>('');

  const send = (): void => {
    if (message.trim().length > 0) {
      const dto = {text: message} as MessageDTO;
      ChatService.sendIndirectMessage(chatId, dto).catch((response) => {
        handleResponse(response);
      });
    }
  };

  return (
    <Box className={classes.root}>
      <ChatContentInput send={send} setMessage={setMessage} />
      <ChatContentSendButton send={send} />
    </Box>
  );
};

export default ChatContentFooter;
