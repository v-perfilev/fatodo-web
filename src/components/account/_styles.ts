import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const authPageStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export const authFormStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 350,
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const passwordStrengthBarStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'inherit',
    height: 4,
    display: 'inline-flex',
    justifyContent: 'space-between',
    '& > *': {
      width: 80,
      height: 'inherit',
    },
  },
  green: {
    backgroundColor: theme.palette.primary.main,
  },
  red: {
    // backgroundColor: theme.palette.error.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));
