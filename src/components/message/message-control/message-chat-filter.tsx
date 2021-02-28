import React, {ChangeEvent, FC} from 'react';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../common/inputs';
import {messageChatFilterStyles} from './_styles';

type Props = {
  setFilter: (filter: string) => void;
};

const MessageChatFilter: FC<Props> = ({setFilter}: Props) => {
  const classes = messageChatFilterStyles();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder="Filter" onChange={handleOnChange} fullWidth />
    </Box>
  );
};

export default MessageChatFilter;
