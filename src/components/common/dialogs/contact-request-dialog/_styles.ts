import {makeStyles, Theme} from '@material-ui/core/styles';

export const contactRequestDialogStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.gradient
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));
