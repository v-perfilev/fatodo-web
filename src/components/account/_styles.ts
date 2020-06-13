import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const authPageStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const authFormStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 286,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const passwordStrengthBarStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > *': {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      height: '100%',
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  green: {
    backgroundColor: theme.palette.primary.main,
  },
  red: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const socialLoginStyles = makeStyles((theme: Theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      flexGrow: 1,
    },
  },
  caption: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(-1),
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '&:nth-child(2n)': {
        marginRight: 0,
      },
    },
  },
}));
