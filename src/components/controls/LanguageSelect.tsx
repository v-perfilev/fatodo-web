import * as React from 'react';
import {HTMLAttributes, useRef, useState} from 'react';
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, MenuItem, Theme} from '@material-ui/core';
import {LANGUAGES} from '../../shared/i18n';
import LanguageIcon from '../icons/LanguageIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import {LanguageUtils} from '../../shared/utils/language.utils';
import {PopupMenu} from '../surfaces';
import {makeStyles} from '@material-ui/core/styles';

type LanguageSelectProps = HTMLAttributes<HTMLElement> & {
  list?: boolean;
};

const getShortNameByCode = (code: string, list: boolean): string => {
  const getName = (c: string): string => LANGUAGES.find((l) => l.code === c)?.name;
  const getShortName = (s: string): string => s.substr(0, 2);
  const name = LanguageUtils.getLanguages().includes(code)
    ? getName(code)
    : getName(LanguageUtils.getFallbackLanguage());
  return list ? name : getShortName(name);
};

const LanguageSelect = ({list, className}: LanguageSelectProps) => {
  const classes = languageSelectStyles();
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
      <ListItem button ref={ref} onClick={handleClick}>
        <ListItemIcon>
          <LanguageIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{getShortNameByCode(LanguageUtils.getLanguage(), list)}</ListItemText>
      </ListItem>
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
        {LANGUAGES.map((language, index) => (
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

const languageSelectStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));

export default LanguageSelect;
