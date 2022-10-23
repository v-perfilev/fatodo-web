import {makeStyles, Theme} from '@material-ui/core/styles';

export const itemFormStyles = makeStyles((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    display: 'none',
  },
}));