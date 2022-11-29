import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Typography} from '@mui/material';
import {UserAccount} from '../../../../models/User';
import ClearableTextInput, {ClearableTextInputMethods} from '../../../../components/inputs/ClearableTextInput';

type AccountDeleteDialogContentProps = {
  account: UserAccount;
  request: () => void;
  cancel: () => void;
};

const AccountDeleteDialogContent = ({account, request, cancel}: AccountDeleteDialogContentProps) => {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<ClearableTextInputMethods>();

  const disabled = useMemo<boolean>(() => {
    return value !== account?.username;
  }, [account, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setValue('');
    inputRef.current?.clear();
    cancel();
  };

  const username = account?.username;

  return (
    <FVStack>
      <Typography>{t('account:deletePermanently.text', {username})}</Typography>

      <ClearableTextInput color="error" onChange={handleChange} clearableInputRef={inputRef} />

      <FHStack justifyContent="flex-end">
        <Button variant="text" color="secondary" onClick={handleCancel}>
          {t('account:deletePermanently.cancel')}
        </Button>
        <Button variant="contained" color="error" disabled={disabled} onClick={request}>
          {t('account:deletePermanently.confirm')}
        </Button>
      </FHStack>
    </FVStack>
  );
};

export default AccountDeleteDialogContent;
