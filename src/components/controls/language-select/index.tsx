import * as React from 'react';
import {FC, HTMLAttributes, useRef, useState} from 'react';
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, MenuItem} from '@material-ui/core';
import {LANGUAGES} from '../../../shared/i18n';
import {LanguageIcon} from '../../icons/language-icon';
import {ArrowDownIcon} from '../../icons/arrow-down-icon';
import {LanguageUtils} from '../../../shared/utils/language.utils';
import {languageSelectStyles} from './_styles';
import {PopupMenu} from '../../surfaces';

type Props = HTMLAttributes<HTMLElement> & {
  list?: boolean;
};

export const LanguageSelect: FC<Props> = ({list, className}: Props) => {
  const classes = languageSelectStyles();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const getShortNameByCode = (code, short?): string => {
    const getName = (c): string => LANGUAGES.find((l) => l.code === c)?.name;
    const getShortName = (s): string => s.substr(0, 2);
    const name = LanguageUtils.getLanguages().includes(code)
      ? getName(code)
      : getName(LanguageUtils.getOptions().fallbackLng);
    return short ? getShortName(name) : name;
  };

  const changeLanguage = (code): void => {
    LanguageUtils.setLanguage(code);
    setIsOpen(false);
  };

  return (
    <Box className={className}>
      {list ? (
        <List component="nav">
          <ListItem button ref={ref} onClick={handleClick}>
            <ListItemIcon>
              <LanguageIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText>{getShortNameByCode(LanguageUtils.getLanguage())}</ListItemText>
          </ListItem>
        </List>
      ) : (
        <Button color="primary" startIcon={<LanguageIcon />} ref={ref} onClick={handleClick}>
          {getShortNameByCode(LanguageUtils.getLanguage())}
          <ArrowDownIcon />
        </Button>
      )}
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        {LANGUAGES.map((language, index) => (
          <MenuItem onClick={(): void => changeLanguage(language.code)} key={index}>
            {language.name}
          </MenuItem>
        ))}
      </PopupMenu>
    </Box>
  );
};
