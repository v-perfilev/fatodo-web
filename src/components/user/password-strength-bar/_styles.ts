import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const passwordStrengthBarStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > *': {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      height: '100%',
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  bgGreen: {
    backgroundColor: theme.palette.primary.main,
  },
  red: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
