import {makeStyles, Theme} from '@material-ui/core/styles';

export const itemFormStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
