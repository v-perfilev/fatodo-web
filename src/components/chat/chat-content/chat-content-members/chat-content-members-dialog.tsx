import React, {FC, useRef} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {chatContentMembersDialog} from './_styles';
import ModalDialog from '../../../common/dialogs/modal-dialog';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
};

const ChatContentMembersDialog: FC<Props> = ({chat, isOpen, close}: Props) => {
  const classes = chatContentMembersDialog();
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

export default ChatContentMembersDialog;
