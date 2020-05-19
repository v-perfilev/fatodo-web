import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Fade, Menu, MenuItem, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../../shared/i18n';
import {languageStyles} from './_styles';
import {getLanguage, setLanguage} from '../../utils/language.utils';
import {LanguageIcon} from '../common/icons/language-icon';
import {ArrowDownIcon} from '../common/icons/arrow-down-icon';

const useStyles = languageStyles;

const LanguageSelect: FC = () => {
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
    setLanguage(code);
    setAnchorElement(null);
  };

  return (
    <Box>
      <Button color="inherit" onClick={handleClick}>
        <LanguageIcon className={classes.icon} />
        {getNameForCode(getLanguage())}
        <ArrowDownIcon />
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

export default LanguageSelect;
