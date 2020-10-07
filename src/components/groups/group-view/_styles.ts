import {makeStyles, Theme} from '@material-ui/core/styles';

export const groupViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const groupViewUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0.5),
    },
  },
  avatar: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(0.5),
  },
}));

export const groupViewItemsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const groupViewItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
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
      marginLeft: theme.spacing(3),
    },
  },
  toggleIcon: {
    fontSize: '1.8rem',
    color: theme.palette.grey['400'],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  editIcon: {
    fontSize: '1.8rem',
    color: theme.palette.grey['400'],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  deleteIcon: {
    fontSize: '1.8rem',
    color: theme.palette.grey['400'],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}));

export const groupViewMessagesStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 200,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
