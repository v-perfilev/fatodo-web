import React, {FC, useCallback, useEffect, useMemo} from 'react';
import ChatContentMessageOutcoming from './chat-content-message-outcoming';
import ChatContentMessageIncoming from './chat-content-message-incoming';
import MessageContentBoxEvent from './chat-content-message-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {Message, MessageType} from '../../../../models/message.model';
import {User} from '../../../../models/user.model';
import {MessageUtils} from '../../../../shared/utils/message.utils';

type Props = {
  message: Message;
  account: User;
};

const ChatContentMessage: FC<Props> = ({message, account}: Props) => {
  const {handleUserIds} = useUserListContext();

  const type = useMemo<MessageType>(() => {
    if (message && message.isEvent) {
      return 'event';
    } else if (message && MessageUtils.isIncomingMessage(message, account)) {
      return 'incoming';
    } else if (message) {
      return 'outcoming';
    } else {
      return null;
    }
  }, [message]);

  const handleMessageUserIds = useCallback((): void => {
    const reactionUserIds = message.reactions.map((r) => r.userId);
    const statusUserIds = message.statuses.map((s) => s.userId);
    handleUserIds([message.userId, ...reactionUserIds, ...statusUserIds]);
  }, [message, handleUserIds]);

  useEffect(() => {
    handleMessageUserIds();
  }, [message, message.statuses, message.reactions]);

  return (
    <>
      {type === 'outcoming' && <ChatContentMessageOutcoming message={message} account={account} />}
      {type === 'incoming' && <ChatContentMessageIncoming message={message} account={account} />}
      {type === 'event' && <MessageContentBoxEvent message={message} />}
    </>
  );
};

export default ChatContentMessage;
