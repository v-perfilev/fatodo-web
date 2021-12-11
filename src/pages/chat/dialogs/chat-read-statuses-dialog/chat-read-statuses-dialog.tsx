import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/modal-dialog/modal-dialog';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import {chatReadStatusesDialogStyles} from './_styles';
import ChatReadStatusesDialogItem from './chat-read-statuses-dialog-item';
import {Message, MessageStatus} from '../../../../models/message.model';

export type ChatReadStatusesDialogProps = {
  message: Message;
  users: User[];
  show: boolean;
  close: () => void;
};

export const defaultChatReadStatusesDialogProps: Readonly<ChatReadStatusesDialogProps> = {
  message: null,
  users: [],
  show: false,
  close: (): void => undefined,
};

type ReadStatusWithUser = {
  status: MessageStatus;
  user?: User;
};

type Props = ChatReadStatusesDialogProps;

const ChatReadStatusesDialog: FC<Props> = ({message, users, show, close}: Props) => {
  const classes = chatReadStatusesDialogStyles();
  const {t} = useTranslation();
  const [statuses, setStatuses] = useState<ReadStatusWithUser[]>([]);
  const [statusesToShow, setStatusesToShow] = useState<ReadStatusWithUser[]>([]);

  const filterStatusesToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedList = statuses.filter((reaction) => reaction.user?.username?.includes(filter));
    setStatusesToShow(updatedList);
  };

  const combineUsersWithStatuses = (): void => {
    const userFilter = (userId: string) => (user: User): boolean => user.id === userId;
    const updatedList = message.statuses
      .filter((status) => status.type === 'READ')
      .map((status) => ({
        status,
        user: users.find(userFilter(status.userId)),
      }));
    setStatuses(updatedList);
    setStatusesToShow(updatedList);
  };

  useEffect(() => {
    if (message && users) {
      combineUsersWithStatuses();
    }
  }, [message?.statuses, users]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterStatusesToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {statusesToShow.map((status) => (
        <ChatReadStatusesDialogItem status={status.status} user={status.user} key={status.user.id} />
      ))}
      {statusesToShow.length === 0 && (
        <Box className={classes.notFound}>{t('chat:readStatuses.readStatusesNotFound')}</Box>
      )}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  return (
    <ModalDialog isOpen={show} close={close} title={t('chat:readStatuses.title')} content={content} showCloseIcon />
  );
};

export default ChatReadStatusesDialog;
