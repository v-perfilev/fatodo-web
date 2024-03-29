import ModalDialog from '../../../../components/modals/ModalDialog';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import {Message} from '../../../../models/Message';
import ChatEditMessageForm from './ChatEditMessageForm';
import {ChatActions} from '../../../../store/chat/chatActions';

export type ChatEditMessageDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatEditMessageDialogProps: Readonly<ChatEditMessageDialogProps> = {
  message: null,
  show: false,
  close: (): void => null,
};

const ChatEditMessageDialog = ({message, show, close}: ChatEditMessageDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: MessageDTO, stopSubmitting: () => void): void => {
    dispatch(ChatActions.editMessageThunk({message, dto}))
      .unwrap()
      .then(() => close())
      .catch(() => stopSubmitting());
  };

  const content = <ChatEditMessageForm message={message} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('chat:editMessage.title')} content={content} />;
};

export default memo(ChatEditMessageDialog);
