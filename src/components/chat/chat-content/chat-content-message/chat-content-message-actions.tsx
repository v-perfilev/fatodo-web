import React, {FC, MouseEvent, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../../common/icons/dots-vertical-icon';
import {PopupMenu} from '../../../common/surfaces';
import {useTranslation} from 'react-i18next';
import {DeleteIcon} from '../../../common/icons/delete-icon';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message} from '../../../../models/message.model';
import {chatContentMessageActionsStyles} from './_styles';
import {ReactionsIcon} from '../../../common/icons/reactions-icon';
import ChatService from '../../../../services/chat.service';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';

type Props = {
  message: Message;
  isOutcoming?: boolean;
};

const ChatContentMessageActions: FC<Props> = ({message, isOutcoming}: Props) => {
  const classes = chatContentMessageActionsStyles();
  const {handleResponse} = useSnackContext();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();
  const {showChatReactionsDialog} = useChatDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const openReactionsDialog = (e: MouseEvent<HTMLElement>): void => {
    showChatReactionsDialog(message, users);
    handleClose(e);
  };

  const deleteMessage = (e: MouseEvent<HTMLElement>): void => {
    ChatService.deleteMessage(message.id).catch((response) => {
      handleResponse(response);
    });
    handleClose(e);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={openReactionsDialog}>
          <ReactionsIcon color="primary" />
          {t('chat:menu.addMembers')}
        </MenuItem>
        {isOutcoming && (
          <MenuItem onClick={deleteMessage}>
            <DeleteIcon color="error" />
            {t('chat:menu.renameChat')}
          </MenuItem>
        )}
      </PopupMenu>
    </>
  );
};

export default ChatContentMessageActions;
