import {makeStyles, Theme} from '@material-ui/core/styles';

export const additionalMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
