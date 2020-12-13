import {makeStyles, Theme} from '@material-ui/core/styles';

export const userViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: theme.spacing(1),
  },
}));
