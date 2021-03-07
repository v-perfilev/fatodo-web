import React, {FC, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageContentFooterStyles} from './_styles';
import MessageContentInput from './message-content-input';
import MessageContentSendButton from './message-content-send-button';
import {MessageDTO} from '../../../models/dto/message.dto';
import MessageService from '../../../services/message.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';

type Props = {
  chatId: string;
}

const MessageContentFooter: FC<Props> = ({chatId}: Props) => {
  const classes = messageContentFooterStyles();
  const {handleResponse} = useSnackContext();
  const [message, setMessage] = useState<string>('');

  const send = (): void => {
    const dto = {text: message} as MessageDTO;
    MessageService.sendIndirectMessage(chatId, dto)
      .then(() => {
        console.log('message sent successfully');
      })
      .catch((response) => {
        handleResponse(response);
        console.log('error during message sending');
      });
  };

  return (
    <Box className={classes.root}>
      <MessageContentInput send={send} setMessage={setMessage} />
      <MessageContentSendButton send={send} />
    </Box>
  );

};

export default MessageContentFooter;
