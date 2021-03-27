import React, {FC} from 'react';
import {Message} from '../../../models/message.model';
import {Box} from '@material-ui/core';

type Props = {
  message: Message;
}

const MessageControlLastMessage: FC<Props> = ({message}: Props) => {

  return (
    <Box>
      {message?.text}
    </Box>
  );
};

export default MessageControlLastMessage;
