import {makeStyles, Theme} from '@material-ui/core/styles';

export const permissionViewStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.grey['400'],
  },
}));
