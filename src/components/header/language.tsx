import * as React from 'react';
import {FC} from 'react';
import {
  Box,
  Button,
  createStyles,
  Fade,
  Menu,
  MenuItem,
  StyleRules,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../../shared/i18n';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = (theme: Theme): StyleRules<any> =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
  });

type Props = WithStyles<typeof styles>;

const Language: FC<any> = ({classes}: Props) => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
  const {i18n} = useTranslation();

  const isOpen = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorElement(event.currentTarget);

  const handleClose = (): void => setAnchorElement(null);

  const getNameForCode = (code): string => LANGUAGES.find((l) => l.code === code)?.name;

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

export default withStyles(styles)(Language);
