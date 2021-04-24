import React, {FC, memo, useEffect, useMemo} from 'react';
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
  isVisible: boolean;
};

const ChatContentMessage: FC<Props> = ({message, account, isVisible}: Props) => {
  const {handleUserIds} = useUserListContext();

  const type = useMemo<MessageType>(() => {
    if (message) {
      if (message.isEvent) {
        return 'event';
      } else if (MessageUtils.isIncomingMessage(message, account)) {
        return 'incoming';
      } else {
        return 'outcoming';
      }
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
  }, []);

  return (
    <>
      {type === 'outcoming' && <ChatContentMessageOutcoming message={message} />}
      {type === 'incoming' && <ChatContentMessageIncoming message={message} account={account} isVisible={isVisible} />}
      {type === 'event' && <MessageContentBoxEvent message={message} />}
    </>
  );
};
export default memo(ChatContentMessage);
