import {makeStyles, Theme} from '@material-ui/core/styles';
import {GRADIENT_COLORS} from '../../../shared/theme';

export const groupStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export const groupHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  divider: {
    width: '100%',
    height: 5,
    marginTop: theme.spacing(1),
  },
  dividerYellow: {
    background: GRADIENT_COLORS.YELLOW,
  },
}));

export const groupUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  avatar: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(0.5),
  },
}));

export const groupItemsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export const groupMessagesStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));
