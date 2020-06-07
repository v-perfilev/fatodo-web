import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Fade, Menu, MenuItem} from '@material-ui/core';
import {LANGUAGES} from '../../shared/i18n';
import {LanguageIcon} from './icons/language-icon';
import {ArrowDownIcon} from './icons/arrow-down-icon';
import {LanguageUtils} from '../../shared/utils/language.utils';

const LanguageSelect: FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorElement(event.currentTarget);

  const handleClose = (): void => setAnchorElement(null);

  const getNameForCode = (code): string => {
    const getName = (c): string => LANGUAGES.find((l) => l.code === c)?.name;
    return LanguageUtils.getLanguages().includes(code)
      ? getName(code)
      : getName(LanguageUtils.getOptions().fallbackLng);
  };

  const changeLanguage = (code): void => {
    LanguageUtils.setLanguage(code);
    setAnchorElement(null);
  };

  return (
    <Box>
      <Button onClick={handleClick} color="primary" startIcon={<LanguageIcon />}>
        {getNameForCode(LanguageUtils.getLanguage())}
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
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelect;
