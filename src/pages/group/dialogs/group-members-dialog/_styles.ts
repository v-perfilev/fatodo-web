import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const groupMembersDialogStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
    fontSize: '1rem',
  },
  filter: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  users: {
    marginTop: theme.spacing(2),
  },
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
  userBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  user: {
    flexGrow: 1,
  },
}));

export const groupMembersDialogMemberStyles = makeStyles((theme: Theme) => ({
  userBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  user: {
    flexGrow: 1,
  },
  deleteUser: {
    color: theme.palette.error.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.error.main,
    },
  },
}));
