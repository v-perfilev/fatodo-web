import React, {ChangeEvent, FC} from 'react';
import {Box, TextField} from '@material-ui/core';
import {messageChatFilterStyles} from './_styles';


const MessageChatFilter: FC = () => {
  const classes = messageChatFilterStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    console.log(filter);
  };

  return (
    <Box className={classes.root}>
      <TextField className={classes.input} placeholder="Filter" onChange={handleChange} />
    </Box>
  );
};

export default MessageChatFilter;
