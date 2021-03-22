import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../models/chat.model';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import MessageBox from '../message-box';
import {User} from '../../../models/user.model';
import MessageContentLoader from './message-content-loader';
import MessageService from '../../../services/message.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {Message} from '../../../models/message.model';
import {useWsMessagesContext} from '../../../shared/contexts/ws-contexts/ws-messages-context';
import {WsUtils} from '../../../shared/utils/ws.utils';

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
  const {messageNewEvent, messageUpdateEvent} = useWsMessagesContext();
  const {handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = (): void => {
    setLoading(true);
    MessageService.getAllMessagesByChatIdPageable(chat.id)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMessages();
  }, [chat]);

  useEffect(() => {
    WsUtils.handleMessageNewEvent(chat, messageNewEvent, setMessages);
  }, [messageNewEvent]);

  useEffect(() => {
    WsUtils.handleMessageUpdateEvent(chat, messageUpdateEvent, setMessages);
  }, [messageUpdateEvent]);

  const rowRenderer = ({index, key, parent, style}: any): ReactElement => (
    <CellMeasurer cache={cellMeasurerCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
      <MessageBox message={messages[index]} account={account} key={key} style={style} />
    </CellMeasurer>
  );

  const listRenderer = ({height, width}: any): ReactElement => (
    <List
      height={height}
      width={width}
      deferredMeasurementCache={cellMeasurerCache}
      rowCount={messages.length}
      rowHeight={cellMeasurerCache.rowHeight}
      overscanRowCount={10}
      scrollToIndex={messages.length - 1}
      rowRenderer={rowRenderer}
    />
  );

  return loading ? (
    <MessageContentLoader />
  ) : (
    <Box className={classes.root}>
      <AutoSizer>{listRenderer}</AutoSizer>
    </Box>
  );
};

export default MessageContentList;
