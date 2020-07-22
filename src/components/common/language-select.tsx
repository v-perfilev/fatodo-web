import * as React from 'react';
import {FC} from 'react';
import {Button, Fade, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from '@material-ui/core';
import {LANGUAGES} from '../../shared/i18n';
import {LanguageIcon} from './icons/language-icon';
import {ArrowDownIcon} from './icons/arrow-down-icon';
import {LanguageUtils} from '../../shared/utils/language.utils';
import {sidebarMenuStyles} from '../layout/header/_styles';

type Props = {
  list?: boolean;
};

const LanguageSelect: FC<Props> = ({list}: Props) => {
  const classes = sidebarMenuStyles();
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorElement(event.currentTarget);

  const handleClose = (): void => setAnchorElement(null);

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
    setAnchorElement(null);
  };

  return (
    <>
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
      <Menu
        id="language-menu"
        anchorEl={anchorElement}
        keepMounted={true}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {LANGUAGES.map((language, index) => (
          <MenuItem onClick={(): void => changeLanguage(language.code)} key={index}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelect;
