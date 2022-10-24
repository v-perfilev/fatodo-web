import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import {SxProps} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {CHATS_FILTER_HEIGHT} from '../../../constants';

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
    <FHStack flexGrow={0} sx={containerStyles}>
      <ClearableTextInput
        variant="standard"
        placeholder={t('inputs.filter')}
        onChange={handleChange}
        fullWidth
        disableUnderline
      />
    </FHStack>
  );
};

const containerStyles: SxProps = (theme: Theme) => ({
  zIndex: 1,
  width: '100%',
  height: CHATS_FILTER_HEIGHT,
  padding: 1,
  backgroundColor: theme.palette.background.default,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.300',
});

export default ChatListControl;
