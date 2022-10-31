import React, {Dispatch, SetStateAction} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {useTranslation} from 'react-i18next';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import {SxProps} from '@mui/material';
import {Theme} from '@mui/material/styles';

type ContactListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ContactListControl = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <FHStack flexGrow={0} sx={containerStyles}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} fullWidth />
    </FHStack>
  );
};

const containerStyles: SxProps = (theme: Theme) => ({
  width: '100%',
  zIndex: 1,
  paddingTop: 2,
  paddingBottom: 1,
  backgroundColor: theme.palette.background.default,
});

export default ContactListControl;
