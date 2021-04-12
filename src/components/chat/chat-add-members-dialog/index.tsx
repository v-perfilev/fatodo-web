import React, {FC, useRef} from 'react';
import {Chat} from '../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ModalDialog from '../../common/dialogs/modal-dialog';
import {chatAddMembersDialogStyles} from './_styles';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
  switchToMembers: () => void;
};

const ChatAddMembersDialog: FC<Props> = ({chat, isOpen, close, switchToMembers}: Props) => {
  const classes = chatAddMembersDialogStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();

  return (
    <ModalDialog
      isOpen={isOpen}
      close={close}
      title={<>Название</>}
      content={<>Тело диалога</>}
      showCloseIcon
    />
  );
};

export default ChatAddMembersDialog;
