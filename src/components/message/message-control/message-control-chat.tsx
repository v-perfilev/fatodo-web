import React, {FC} from 'react';
import {Box} from '@material-ui/core';

type Props = {
  n: number;
};

const MessageControlChat: FC<Props> = ({n}: Props) => {

  return (
    <Box>
      {n}
    </Box>
  );
};

export default MessageControlChat;

