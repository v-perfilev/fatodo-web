import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../shared/theme';

export const accountStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      '&:first-child': {
        marginLeft: theme.spacing(0),
      },
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const headerStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
}));

export const languageStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const logoStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: 50,
    marginRight: theme.spacing(1),
  },
  logoText: {
    marginTop: -8,
    color: COLORS.WHITE,
  },
}));
