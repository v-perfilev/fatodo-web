import {makeStyles, Theme} from '@material-ui/core/styles';

export const paddingStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
