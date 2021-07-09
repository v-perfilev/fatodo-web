import React, {FC, memo, ReactElement, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {CHAT_HEIGHT} from '../../_constants';
import {ChatControlItemDataProps, ChatControlItemProps} from './types';
import ChatControlRenderer from './chat-control-renderer';
import {VirtualizedList} from '../../../../components/surfaces';
import {chatControlContainerStyles} from './_styles';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  chats: Chat[];
  loadMoreItems?: () => Promise<void>;
  allLoaded?: boolean;
  account: User;
};

const ChatControlContainer: FC<Props> = ({chat, setChat, chats, loadMoreItems, allLoaded, account}: Props) => {
  const classes = chatControlContainerStyles();

  const handleOnChatClick = useCallback(
    (index: number) => (): void => {
      const chat = chats[index];
      setChat(chat);
    },
    [chats]
  );

  const itemRenderer = useCallback(
    (props: ChatControlItemProps): ReactElement => <ChatControlRenderer {...props} />,
    []
  );

  const itemData = useMemo<ChatControlItemDataProps>(
    () => ({
      items: chats,
      chat,
      account,
      handleOnChatClick,
    }),
    [chats, chat, account, handleOnChatClick]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        itemData={itemData}
        loadMoreItems={loadMoreItems}
        allLoaded={allLoaded}
        itemHeight={CHAT_HEIGHT}
      />
    </Box>
  );
};

export default memo(ChatControlContainer);
