import React, {FC} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../common/dialogs/modal-dialog';
import {chatAddMembersDialogStyles} from './_styles';
import {Button} from '@material-ui/core';
import {UserPlusIcon} from '../../../common/icons/user-plus-icon';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';

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
