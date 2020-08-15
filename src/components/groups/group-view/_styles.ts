import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../../../shared/theme';

export const groupStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const groupUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

export const groupItemListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const groupItemViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
  },
  icon: {
    fontSize: '1.8rem',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  iconBox: {
    display: 'flex',
    minWidth: 50,
    '& > *': {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(1),
    },
  },
  contentBox: {
    display: 'flex',
    flexGrow: 1,
    fontSize: '1rem',
  },
  managementBox: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(0.5),
    },
  },
  toggleIcon: {
    fontSize: '1.8rem',
    color: COLORS.GREY,
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: COLORS.MAIN,
    },
  },
  editIcon: {
    fontSize: '1.8rem',
    color: COLORS.GREY,
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: COLORS.SECONDARY,
    },
  },
  deleteIcon: {
    fontSize: '1.8rem',
    color: COLORS.GREY,
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: COLORS.ERROR,
    },
  },
}));

export const groupMessagesStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
