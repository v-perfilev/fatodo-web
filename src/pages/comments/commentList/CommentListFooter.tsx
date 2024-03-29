import React, {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput, {ClearableTextInputMethods} from '../../../components/inputs/ClearableTextInput';
import {useTranslation} from 'react-i18next';
import {CommentDTO} from '../../../models/dto/CommentDTO';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {IconButton} from '@mui/material';
import FVStack from '../../../components/boxes/FVStack';
import PageFooter from '../../../components/layouts/PageFooter';

type CommentListFooterProps = {
  width?: number;
};

const CommentListFooter = ({width}: CommentListFooterProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const [messageBody, setMessageBody] = useState<string>('');
  const inputRef = useRef<ClearableTextInputMethods>();

  const isValid = messageBody.length > 0;

  const handleSend = (): void => {
    const dto: CommentDTO = {text: messageBody};
    dispatch(CommentsActions.sendCommentThunk({targetId, dto}));
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
    <PageFooter width={width} maxWidth="md" position="absolute">
      <FVStack spacing={0}>
        <ClearableTextInput
          placeholder={t('comment:list.inputPlaceholder')}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          fullWidth
          disableUnderline
          clearableInputRef={inputRef}
        />
      </FVStack>
      <FHStack flexGrow={0}>
        <IconButton color="primary" disabled={!isValid} onClick={handleSend}>
          <SendMessageIcon />
        </IconButton>
      </FHStack>
    </PageFooter>
  );
};

export default CommentListFooter;
