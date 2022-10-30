import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';

type ChatListControlProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ChatListControl = ({setFilter}: ChatListControlProps) => {
  const {t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <PageHeader position="absolute">
      <ClearableTextInput
        variant="standard"
        placeholder={t('inputs.filter')}
        onChange={handleChange}
        fullWidth
        disableUnderline
      />
    </PageHeader>
  );
};

export default ChatListControl;
