import React, {FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import {DotsVerticalIcon} from '../../../../components/icons/DotsVerticalIcon';
import {PopupMenu, PopupMenuItem, PopupMenuItemProps} from '../../../../components/surfaces';
import {useTranslation} from 'react-i18next';
import {DeleteIcon} from '../../../../components/icons/DeleteIcon';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message} from '../../../../models/message.model';
import {ReactionsIcon} from '../../../../components/icons/ReactionsIcon';
import ChatService from '../../../../services/chat.service';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';
import {EyeIcon} from '../../../../components/icons/EyeIcon';
import {EditIcon} from '../../../../components/icons/EditIcon';

type Props = {
  message: Message;
  isOutcoming?: boolean;
};

const ChatContentMessageActions: FC<Props> = ({message, isOutcoming}: Props) => {
  const {handleResponse} = useSnackContext();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();
  const {showMessageReactionsDialog, showMessageReadStatusesDialog, showMessageEditDialog} = useChatDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const openReactionsDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showMessageReactionsDialog(message, users);
      handleClose(e);
    },
    [message, users, showMessageReactionsDialog],
  );

  const openReadStatusesDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showMessageReadStatusesDialog(message, users);
      handleClose(e);
    },
    [message, users, showMessageReadStatusesDialog],
  );

  const editMessage = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showMessageEditDialog(message);
      handleClose(e);
    },
    [message, showMessageEditDialog],
  );

  const deleteMessage = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      ChatService.deleteMessage(message.id).catch((response) => {
        handleResponse(response);
      });
      handleClose(e);
    },
    [message, handleResponse],
  );

  const menuItems = [
    {action: openReactionsDialog, icon: <ReactionsIcon color="primary" />, text: t('chat:message.actions.reactions')},
    {action: openReadStatusesDialog, icon: <EyeIcon color="primary" />, text: t('chat:message.actions.readStatuses')},
    {
      action: editMessage,
      icon: <EditIcon color="primary" />,
      text: t('chat:message.actions.edit'),
      show: isOutcoming && !message.isDeleted,
    },
    {
      action: deleteMessage,
      icon: <DeleteIcon color="error" />,
      text: t('chat:message.actions.delete'),
      show: isOutcoming && !message.isDeleted,
    },
  ] as PopupMenuItemProps[];

  return (
    <>
      <IconButton onClick={handleClickOnAction} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <Box>
          {menuItems.map((item, index) => (
            <PopupMenuItem action={item.action} icon={item.icon} text={item.text} show={item.show} key={index} />
          ))}
        </Box>
      </PopupMenu>
    </>
  );
};

export default ChatContentMessageActions;
