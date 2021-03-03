import React, {FC} from 'react';
import {Message} from '../../../models/message.model';

type Props = {
  message: Message
}

const MessageBoxOutcoming: FC<Props> = ({message}: Props) => {

  return (
    <>{message.text}</>
  );
};

export default MessageBoxOutcoming;
