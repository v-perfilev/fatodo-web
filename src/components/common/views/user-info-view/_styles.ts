import {makeStyles, Theme} from '@material-ui/core/styles';

export const userInfoViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}));
