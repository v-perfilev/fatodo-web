import {makeStyles, Theme} from '@material-ui/core/styles';

export const accountStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export const accountFormStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  form: {
    '& > *': {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5)
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}));
