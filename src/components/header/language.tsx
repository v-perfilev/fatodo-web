import * as React from 'react';
import {
  Box,
  Button,
  createStyles,
  Fade,
  Link,
  Menu,
  MenuItem,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../shared/i18n';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = (theme: Theme) =>
  createStyles({
    white: {
      color: 'white',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  });

type Props = WithStyles<typeof styles>;

const language = ({ classes }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();

  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const getNameForCode = code => LANGUAGES.find(l => l.code === code).name;

  const changeLanguage = code => {
    i18n.changeLanguage(code);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button onClick={handleClick} className={classes.white}>
        <LanguageIcon className={classes.icon} />
        {getNameForCode(i18n.language)}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {LANGUAGES.map((language, index) => (
          <MenuItem onClick={() => changeLanguage(language.code)} key={index}>
            <Typography>{language.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default withStyles(styles)(language);
