import React, {ChangeEvent, FC} from 'react';
import {Box, TextField} from '@material-ui/core';
import {messageChatFilterStyles} from './_styles';

type Props = {
  setFilter: (filter: string) => void;
};

const MessageChatFilter: FC<Props> = ({setFilter}: Props) => {
  const classes = messageChatFilterStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <TextField className={classes.input} placeholder="Filter" onChange={handleChange} />
    </Box>
  );
};

export default MessageChatFilter;
