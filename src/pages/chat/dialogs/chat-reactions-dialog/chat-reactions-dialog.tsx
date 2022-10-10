import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/ModalDialog';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import {chatReactionsDialogStyles} from './_styles';
import ChatReactionsDialogItem from './chat-reactions-dialog-item';
import {Message, MessageReaction} from '../../../../models/message.model';

export type ChatReactionDialogProps = {
  message: Message;
  users: User[];
  show: boolean;
  close: () => void;
};

export const defaultChatReactionDialogProps: Readonly<ChatReactionDialogProps> = {
  message: null,
  users: [],
  show: false,
  close: (): void => undefined,
};

type MessageReactionWithUser = {
  reaction: MessageReaction;
  user?: User;
};

type Props = ChatReactionDialogProps;

const ChatReactionsDialog: FC<Props> = ({message, users, show, close}: Props) => {
  const classes = chatReactionsDialogStyles();
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<MessageReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<MessageReactionWithUser[]>([]);

  const filterReactionsToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(filter));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const userFilter = (userId: string) => (user: User): boolean => user.id === userId;
    const updatedList = message.reactions.map((reaction) => ({
      reaction,
      user: users.find(userFilter(reaction.userId)),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (message && users) {
      combineUsersWithReactions();
    }
  }, [message?.reactions, users]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterReactionsToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {reactionsToShow.map((reaction) => (
        <ChatReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
      ))}
      {reactionsToShow.length === 0 && <Box className={classes.notFound}>{t('chat:reactions.reactionsNotFound')}</Box>}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  return <ModalDialog isOpen={show} close={close} title={t('chat:reactions.title')} content={content} showCloseIcon />;
};

export default ChatReactionsDialog;
