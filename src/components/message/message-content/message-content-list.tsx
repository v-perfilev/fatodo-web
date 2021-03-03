import React, {FC, MutableRefObject, ReactElement, useRef} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../models/chat.model';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';
import MessageBox from '../message-box';
import {User} from '../../../models/user.model';

type Props = {
  chat: Chat;
  account: User;
};

const MessageContentList: FC<Props> = ({chat, account}: Props) => {
  const classes = messageContentListStyles();
  const messageRefs = useRef<HTMLDivElement>();

  const array = Array.from({length: 5000}, (_, i) => i);

  const messages = array.map((value) => {
    return {
      chatId: chat.id,
      userId: 'test',
      text: `message_${value}`,
      forwardedMessage: null,
      isEvent: false,
      createdAt: new Date().getTime() + '',
      statuses: [],
      reactions: []
    };
  });

  const setMessageRef = (index: number) => (ref: MutableRefObject<HTMLDivElement>): void => {
    messageRefs.current = {...messageRefs.current, [index]: ref};
  };

  const getMessageHeight = (index: number): number => {
    return messageRefs.current ? messageRefs.current[index].clientHeight : 50;
  };

  const RowRenderer = ({index}): ReactElement => (
    <MessageBox message={messages[index]} account={account} setRef={setMessageRef(index)} />
  );

  const ListRenderer = ({height, width}): ReactElement => (
    <VariableSizeList
      height={height}
      width={width}
      itemCount={messages.length}
      itemSize={getMessageHeight}
      // overscanCount={50}
    >
      {RowRenderer}
    </VariableSizeList>
  );

  return (
    <Box className={classes.root}>
      <AutoSizer>
        {ListRenderer}
      </AutoSizer>
    </Box>
  );

};

export default MessageContentList;
