import React, {HTMLAttributes, useRef, useState} from 'react';
import LanguageIcon from '../icons/LanguageIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {Box, Button, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, SxProps} from '@mui/material';
import {languages} from '../../shared/i18n';
import PopupMenu from '../surfaces/popupMenu/PopupMenu';

type LanguageSelectProps = HTMLAttributes<HTMLElement> & {
  list?: boolean;
};

const getShortNameByCode = (code: string, list: boolean): string => {
  const getName = (c: string): string => languages.find((l) => l.code === c)?.name;
  const getShortName = (s: string): string => s?.substr(0, 2);
  const name = LanguageUtils.getLanguages().includes(code)
    ? getName(code)
    : getName(LanguageUtils.getFallbackLanguage());
  return list ? name : getShortName(name);
};

const LanguageSelect = ({list, className}: LanguageSelectProps) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const changeLanguage = (code: string): void => {
    LanguageUtils.setLanguage(code);
    setIsOpen(false);
  };

  const listElement = (
    <List component="nav">
      <ListItemButton ref={ref} onClick={handleClick}>
        <ListItemIcon>
          <LanguageIcon sx={iconStyles} />
        </ListItemIcon>
        <ListItemText>{getShortNameByCode(LanguageUtils.getLanguage(), list)}</ListItemText>
      </ListItemButton>
    </List>
  );

  const buttonElement = (
    <Button color="primary" startIcon={<LanguageIcon />} ref={ref} onClick={handleClick}>
      {getShortNameByCode(LanguageUtils.getLanguage(), list)}
      <ArrowDownIcon />
    </Button>
  );

  const popupMenu = (
    <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
      <Box>
        {languages.map((language, index) => (
          <MenuItem onClick={(): void => changeLanguage(language.code)} key={index}>
            {language.name}
          </MenuItem>
        ))}
      </Box>
    </PopupMenu>
  );

  return (
    <Box className={className}>
      {list ? listElement : buttonElement}
      {popupMenu}
    </Box>
  );
};

const iconStyles: SxProps = {
  color: 'primary.main',
};

export default LanguageSelect;
