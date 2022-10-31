import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import ChatMessageReactionsDialogItem from './ChatMessageReactionsDialogItem';
import {Message, MessageReaction} from '../../../../models/Message';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {Typography} from '@mui/material';

type MessageReactionWithUser = {
  reaction: MessageReaction;
  user?: User;
};

export type ChatMessageReactionsDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatMessageReactionsDialogProps: Readonly<ChatMessageReactionsDialogProps> = {
  message: null,
  show: false,
  close: (): void => null,
};

const ChatMessageReactionsDialog = ({message, show, close}: ChatMessageReactionsDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const reactionUserIds = useMemo(() => message?.reactions.map((r) => r.userId), [message]);
  const users = useAppSelector((state) => usersSelector(state, reactionUserIds));
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<MessageReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<MessageReactionWithUser[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(value));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const updatedList = message.reactions.map((reaction) => ({
      reaction,
      user: users.find((u) => u.id === reaction.userId),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (message && users) {
      combineUsersWithReactions();
    }
  }, [message?.reactions, users]);

  const content = (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} />
      {reactionsToShow.length > 0 && (
        <FVStack>
          {reactionsToShow.map((reaction) => (
            <ChatMessageReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
          ))}
        </FVStack>
      )}
      {reactions.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('chat:reactions.reactionsNotFound')}
          </Typography>
        </FCenter>
      )}
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('chat:reactions.title')} content={content} />;
};

export default memo(ChatMessageReactionsDialog);
