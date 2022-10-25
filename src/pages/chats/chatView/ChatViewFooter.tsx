import React from 'React';
import {IconButton, SxProps} from '@mui/material';
import {CHAT_FOOTER_HEIGHT} from '../../../constants';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useTranslation} from 'react-i18next';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {useRef, useState} from 'react';
import {MessageDTO} from '../../../models/dto/MessageDTO';
import {ChatActions} from '../../../store/chat/chatActions';
import ClearableTextInput, {ClearableTextInputMethods} from '../../../components/inputs/ClearableTextInput';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';

const ChatViewFooter = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const chat = useAppSelector(ChatSelectors.chat);
  const [messageBody, setMessageBody] = useState<string>('');
  const inputRef = useRef<ClearableTextInputMethods>();

  const isValid = messageBody.length > 0;

  const handleSend = (): void => {
    const dto: MessageDTO = {text: messageBody, referenceId: null};
    dispatch(ChatActions.sendMessageThunk({chatId: chat.id, dto}));
    setMessageBody('');
    inputRef.current?.clear();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const trimmedText = value?.trim() || '';
    setMessageBody(trimmedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      handleSend();
    }
  };

  return (
    <FHStack sx={containerStyles}>
      <ClearableTextInput
        placeholder={t('chat:view.inputPlaceholder')}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth
        disableUnderline
        clearableInputRef={inputRef}
      />
      <FHStack flexGrow={0}>
        <IconButton color="primary" disabled={!isValid} onClick={handleSend}>
          <SendMessageIcon />
        </IconButton>
      </FHStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: CHAT_FOOTER_HEIGHT,
  paddingX: 1,
  borderTopWidth: 1,
  borderTopStyle: 'solid',
  borderTopColor: 'grey.300',
};

export default ChatViewFooter;