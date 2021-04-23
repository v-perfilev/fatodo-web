import React, {FC, memo, useEffect, useMemo} from 'react';
import ChatContentMessageOutcoming from './chat-content-message-outcoming';
import ChatContentMessageIncoming from './chat-content-message-incoming';
import MessageContentBoxEvent from './chat-content-message-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {Message, MessageType} from '../../../../models/message.model';
import {compose} from 'recompose';
import withAuthState from '../../../../shared/hocs/with-auth-state';
import {AuthState} from '../../../../store/rerducers/auth.reducer';

type BaseProps = {
  message: Message;
  isVisible: boolean;
};

type Props = AuthState & BaseProps;

const ChatContentMessage: FC<Props> = ({message, account, isVisible}: Props) => {
  const {handleUserIds} = useUserListContext();

  const type = useMemo<MessageType>(() => {
    if (!message.isEvent && message.userId === account.id) {
      return 'outcoming';
    } else if (!message.isEvent && message.userId !== account.id) {
      return 'incoming';
    } else if (message.isEvent) {
      return 'event';
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

export default compose<Props, BaseProps>(memo, withAuthState)(ChatContentMessage);
