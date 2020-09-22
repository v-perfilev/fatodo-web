import * as React from 'react';
import {FC, HTMLAttributes, useState} from 'react';
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, MenuItem} from '@material-ui/core';
import {LANGUAGES} from '../../../../shared/i18n';
import {LanguageIcon} from '../../icons/language-icon';
import {ArrowDownIcon} from '../../icons/arrow-down-icon';
import {LanguageUtils} from '../../../../shared/utils/language.utils';
import {languageSelectStyles} from './_styles';
import PopupMenu from '../popup-menu';

type Props = HTMLAttributes<any> & {
  list?: boolean;
};

export const LanguageSelect: FC<Props> = ({list, className}: Props) => {
  const classes = languageSelectStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

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
    setAnchorEl(null);
  };

  return (
    <Box className={className}>
      {list ? (
        <List component="nav">
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <LanguageIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText>{getShortNameByCode(LanguageUtils.getLanguage())}</ListItemText>
          </ListItem>
        </List>
      ) : (
        <Button onClick={handleClick} color="primary" startIcon={<LanguageIcon />}>
          {getShortNameByCode(LanguageUtils.getLanguage())}
          <ArrowDownIcon />
        </Button>
      )}
      <PopupMenu anchorEl={anchorEl} isOpen={isOpen} onClose={handleClose}>
        {LANGUAGES.map((language, index) => (
          <MenuItem onClick={(): void => changeLanguage(language.code)} key={index}>
            {language.name}
          </MenuItem>
        ))}
      </PopupMenu>
    </Box>
  );
};
