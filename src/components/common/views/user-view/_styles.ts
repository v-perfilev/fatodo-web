import {makeStyles, Theme} from '@material-ui/core/styles';

export const userViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  username: {
    marginLeft: theme.spacing(1)
  }
}));
