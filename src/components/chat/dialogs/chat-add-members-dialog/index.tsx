import React, {FC, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../common/dialogs/modal-dialog';
import {chatAddMembersDialogStyles} from './_styles';
import {Button} from '@material-ui/core';
import {UserPlusIcon} from '../../../common/icons/user-plus-icon';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ContactService from '../../../../services/contact.service';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
  switchToMembers: () => void;
};

const ChatAddMembersDialog: FC<Props> = ({chat, isOpen, close, switchToMembers}: Props) => {
  const classes = chatAddMembersDialogStyles();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);

  const loadContactIds = (): void => {
    ContactService.getAllRelations()
      .then((response) => {
        const relations = response.data;
        const relationUserIds = relations.map((relation) => relation.secondUserId);
        setContactIds(relationUserIds);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const addUsers = (): void => {
    ChatService.addUsersToChat(chat.id, [])
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        switchToMembers();
      });
  };

  const content = <>Test</>;

  const actions = (
    <Button startIcon={<UserPlusIcon />} onClick={addUsers} color="primary">
      {t('chat:addMembers.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      isOpen={isOpen}
      close={close}
      title={t('chat:addMembers.title')}
      content={content}
      actions={actions}
      withText
      showCloseIcon
    />
  );
};

export default ChatAddMembersDialog;
