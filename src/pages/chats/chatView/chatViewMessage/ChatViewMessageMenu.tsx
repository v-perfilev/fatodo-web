import React from 'react';
import {useTranslation} from 'react-i18next';
import {Message} from '../../../../models/Message';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import ReactionsIcon from '../../../../components/icons/ReactionsIcon';
import PageMenu, {PageMenuItem} from '../../../../components/layouts/PageMenuProps';

type ChatViewMessageMenuProps = {
  message: Message;
  isOutcoming: boolean;
};

const ChatViewMessageMenu = ({message, isOutcoming}: ChatViewMessageMenuProps) => {
  const {t} = useTranslation();
  // const {showMessageReactionsDialog, showMessageReadStatusesDialog, showMessageEditDialog, showMessageDeleteDialog} =
  //   useChatDialogContext();

  const openReactionsDialog = (): void => {
    // showMessageReactionsDialog(message);
  };

  const openReadStatusesDialog = (): void => {
    // showMessageReadStatusesDialog(message);
  };

  const editMessage = (): void => {
    // showMessageEditDialog(message);
  };

  const deleteMessage = (): void => {
    // showMessageDeleteDialog(message);
  };

  const menuItems: PageMenuItem[] = [
    {
      action: openReactionsDialog,
      text: t('chat:message.actions.reactions'),
      icon: <ReactionsIcon />,
      color: 'primary',
    },
    {
      action: openReadStatusesDialog,
      text: t('chat:message.actions.readStatuses'),
      icon: <EyeIcon />,
      color: 'primary',
    },
    {
      action: editMessage,
      text: t('chat:message.actions.edit'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: !isOutcoming || message.isDeleted,
    },
    {
      action: deleteMessage,
      text: t('chat:message.actions.delete'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: !isOutcoming || message.isDeleted,
    },
  ];

  return <PageMenu items={menuItems} compactView />;
};

export default ChatViewMessageMenu;
