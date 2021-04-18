import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const userSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  filter: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  users: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
}));

export const userSelectItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  image: {
    marginRight: theme.spacing(1),
  },
  user: {
    display: 'flex',
    flexGrow: 1,
  },
}));
