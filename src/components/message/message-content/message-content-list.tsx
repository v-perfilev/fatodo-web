import React, {FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../models/chat.model';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import MessageBox from '../message-box';
import {User} from '../../../models/user.model';

type Props = {
  chat: Chat;
  account: User;
};

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 100,
  fixedWidth: true
});

const MessageContentList: FC<Props> = ({chat, account}: Props) => {
  const classes = messageContentListStyles();

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

  const rowRenderer = ({index, key, parent, style}): ReactElement => (
    <CellMeasurer
      cache={cellMeasurerCache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <MessageBox message={messages[index]} account={account} key={key} style={style} />
    </CellMeasurer>
  );

  const listRenderer = ({height, width}): ReactElement => (
    <List
      height={height}
      width={width}
      deferredMeasurementCache={cellMeasurerCache}
      rowCount={messages.length}
      rowHeight={cellMeasurerCache.rowHeight}
      rowRenderer={rowRenderer}
    />
  );

  return (
    <Box className={classes.root}>
      <AutoSizer>
        {listRenderer}
      </AutoSizer>
    </Box>
  );

};

export default MessageContentList;
