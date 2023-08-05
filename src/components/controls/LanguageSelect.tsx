import React from 'react';
import LanguageIcon from '../icons/LanguageIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {Button} from '@mui/material';
import {languages} from '../../shared/i18n';
import PopupMenu, {PopupMenuItem} from '../surfaces/PopupMenu';
import {useForceUpdate} from '../../shared/hooks/useForceUpdate';

type LanguageSelectProps = {
  list?: boolean;
  onChange?: (code: string) => void;
};

const getShortNameByCode = (code: string, list: boolean): string => {
  const getName = (c: string): string => languages.find((l) => l.code === c)?.name;
  const getShortName = (s: string): string => s?.substr(0, 2);
  const name = LanguageUtils.getLanguages().includes(code)
    ? getName(code)
    : getName(LanguageUtils.getFallbackLanguage());
  return list ? name : getShortName(name);
};

const LanguageSelect = ({list, onChange}: LanguageSelectProps) => {
  const forceUpdate = useForceUpdate();

  const changeLanguage = (code: string): void => {
    LanguageUtils.setLanguage(code);
    onChange?.(code);
    setTimeout(forceUpdate, 50);
  };

  const buttonElement = (
    <Button color="primary" startIcon={<LanguageIcon />}>
      {getShortNameByCode(LanguageUtils.getLanguage(), list)}
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
