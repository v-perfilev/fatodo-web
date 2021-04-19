import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import ModalDialog from '../../../common/dialogs/modal-dialog';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../../common/inputs';
import {chatReactionsDialogStyles} from './_styles';
import {Message, MessageReaction} from '../../../../models/message.model';
import ChatReactionsDialogReaction from './chat-reactions-dialog-reaction';

type Props = {
  message: Message;
  isOpen: boolean;
  close: () => void;
};

type UserReaction = {
  reaction: MessageReaction;
  user?: User;
}

const ChatReactionsDialog: FC<Props> = ({message, isOpen, close}: Props) => {
  const classes = chatReactionsDialogStyles();
  const {users, handleUserIds} = useUserListContext();
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<UserReaction[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<UserReaction[]>([]);

  const filterReactionsToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedList = reactions
      .filter((reaction) => reaction.user?.username?.includes(filter));
    setReactionsToShow(updatedList);
  };

  const loadUsersFromReactions = (): void => {
    const userIds = message.reactions.map((reaction) => reaction.userId);
    handleUserIds(userIds);
  };

  const combineUsersWithReactions = (): void => {
    const userFilter = (userId: string) => (user: User): boolean => user.id === userId;
    const updatedList = message.reactions.map((reaction) => ({
      reaction,
      user: users.find(userFilter(reaction.userId))
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    loadUsersFromReactions();
  }, []);

  useEffect(() => {
    combineUsersWithReactions();
  }, [users]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterReactionsToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {reactionsToShow.map((reaction, index) => (
        <ChatReactionsDialogReaction reaction={reaction.reaction} user={reaction.user} key={index} />
      ))}
      {reactionsToShow.length === 0 && <Box className={classes.notFound}>{t('common:members.usersNotFound')}</Box>}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  return (
    <ModalDialog
      isOpen={isOpen}
      close={close}
      title={t('chat:members.title')}
      content={content}
      showCloseIcon
    />
  );
};

export default ChatReactionsDialog;
