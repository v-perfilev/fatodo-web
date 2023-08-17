import React from 'react';
import LanguageIcon from '../icons/LanguageIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {Button} from '@mui/material';
import {languages} from '../../shared/i18n';
import PopupMenu, {PopupMenuItem} from '../surfaces/PopupMenu';
import {useForceUpdate} from '../../shared/hooks/useForceUpdate';

type LanguageSelectProps = {
  onChange?: (code: string) => void;
};

const getName = (c: string): string => {
  return languages.find((l) => l.code === c)?.name || '';
};

const getShortName = (c: string): string => {
  const name = getName(c);
  return name.length >= 2 ? name?.substr(0, 2) : '';
};

const LanguageSelect = ({onChange}: LanguageSelectProps) => {
  const forceUpdate = useForceUpdate();
  const changeLanguage = (code: string): void => {
    LanguageUtils.setLanguage(code);
    onChange?.(code);
    setTimeout(forceUpdate, 50);
  };

  const buttonElement = (
    <Button color="primary" startIcon={<LanguageIcon />}>
      {getShortName(LanguageUtils.getLanguage())}
      <ArrowDownIcon />
    </Button>
  );

  return (
    <PopupMenu trigger={buttonElement}>
      {languages.map((language, index) => (
        <PopupMenuItem action={() => changeLanguage(language.code)} text={language.name} key={index} />
      ))}
    </PopupMenu>
  );
};

export default LanguageSelect;
