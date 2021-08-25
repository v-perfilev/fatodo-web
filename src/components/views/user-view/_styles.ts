import {makeStyles, Theme} from '@material-ui/core/styles';

export const userViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-flex',
  },
  divider: {
    width: theme.spacing(1),
  },
}));
