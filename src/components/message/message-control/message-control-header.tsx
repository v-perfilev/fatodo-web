import React, {ChangeEvent, FC} from 'react';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../common/inputs';
import {messageControlHeaderStyles} from './_styles';
import MessageControlChatButton from './message-control-chat-button';

type Props = {
  setFilter: (filter: string) => void;
};

const MessageControlHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = messageControlHeaderStyles();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder="Filter" onChange={handleOnChange} fullWidth />
      <MessageControlChatButton />
    </Box>
  );

};

export default MessageControlHeader;
