import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {Fab} from '@mui/material';
import PlusIcon from '../../../components/icons/PlusIcon';
import FBox from '../../../components/boxes/FBox';

type ChatListControlProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ChatListControl = ({setFilter}: ChatListControlProps) => {
  const {showChatCreateDialog} = useChatDialogContext();
  const {t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <PageHeader maxWidth="md" position="absolute">
      <ClearableTextInput
        variant="standard"
        placeholder={t('inputs.filter')}
        onChange={handleChange}
        fullWidth
        disableUnderline
      />
      <FBox>
        <Fab color="primary" size="small" onClick={showChatCreateDialog}>
          <PlusIcon />
        </Fab>
      </FBox>
    </PageHeader>
  );
};

export default ChatListControl;
