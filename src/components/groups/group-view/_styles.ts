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
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0.5),
    },
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
      color: theme.palette.grey['400'],
      marginLeft: theme.spacing(3),
    },
  },
  showIcon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  editIcon: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  toggleIcon: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  deleteIcon: {
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
