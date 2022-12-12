import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {Box, Fab} from '@mui/material';
import PlusIcon from '../../../components/icons/PlusIcon';

type ChatListControlProps = {
  setFilter: Dispatch<SetStateAction<string>>;
  width?: number;
};

const ChatListControl = ({setFilter, width}: ChatListControlProps) => {
  const {showChatCreateDialog} = useChatDialogContext();
  const {t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <PageHeader width={width} maxWidth="md" position="absolute">
      <ClearableTextInput
        variant="standard"
        placeholder={t('inputs.filter')}
        onChange={handleChange}
        fullWidth
        disableUnderline
      />
      <Box>
        <Fab color="primary" size="small" onClick={showChatCreateDialog}>
          <PlusIcon />
        </Fab>
      </Box>
    </PageHeader>
  );
};

export default ChatListControl;
