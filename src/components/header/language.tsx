import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Fade, Menu, MenuItem, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../../shared/i18n';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {languageStyles} from './_styles';

const useStyles = languageStyles;

const Language: FC = () => {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorElement(event.currentTarget);

  const handleClose = (): void => setAnchorElement(null);

  const getNameForCode = (code): string => {
    const getName = (c): string => LANGUAGES.find((l) => l.code === c)?.name;
    return i18n.languages.includes(code) ? getName(code) : getName(i18n.options.fallbackLng);
  };

  const changeLanguage = (code): void => {
    i18n.changeLanguage(code);
    setAnchorElement(null);
  };

  return (
    <Box>
      <Button color="inherit" onClick={handleClick}>
        <LanguageIcon className={classes.icon} />
        {getNameForCode(i18n.language)}
        <ArrowDropDownIcon />
      </Button>
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
            <Typography>{language.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Language;
