import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatContentItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}));

export const chatContentItemDateStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    fontSize: '0.9rem',
    fontWeight: 'bolder',
    color: theme.palette.primary.main,
  },
  topLine: {
    width: '100%',
    height: 2,
    background: theme.palette.secondary.main,
    marginBottom: theme.spacing(0.5),
  },
  bottomLine: {
    width: '100%',
    height: 2,
    background: theme.palette.secondary.main,
    marginTop: theme.spacing(0.5),
  },
}));
