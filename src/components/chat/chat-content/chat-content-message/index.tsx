import React, {FC, memo, useEffect, useMemo} from 'react';
import ChatContentMessageOutcoming from './chat-content-message-outcoming';
import ChatContentMessageIncoming from './chat-content-message-incoming';
import MessageContentBoxEvent from './chat-content-message-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {Message, MessageReaction, MessageStatus, MessageType} from '../../../../models/message.model';
import {User} from '../../../../models/user.model';
import {MessageUtils} from '../../../../shared/utils/message.utils';

type Props = {
  message: Message;
  reactions: MessageReaction[];
  statuses: MessageStatus[];
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

  const handleMessageUserIds = (): void => {
    const reactionUserIds = message.reactions.map((r) => r.userId);
    const statusUserIds = message.statuses.map((s) => s.userId);
    handleUserIds([message.userId, ...reactionUserIds, ...statusUserIds]);
  };

  useEffect(() => {
    handleMessageUserIds();
  }, [message]);

  return (
    <>
      {type === 'outcoming' && <ChatContentMessageOutcoming message={message} />}
      {type === 'incoming' && <ChatContentMessageIncoming message={message} account={account} />}
      {type === 'event' && <MessageContentBoxEvent message={message} />}
    </>
  );
};

export default memo(ChatContentMessage);
