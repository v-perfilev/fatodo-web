import {makeStyles, Theme} from '@material-ui/core/styles';
import {BOTTOM_DRAWER_HEIGHT, LEFT_DRAWER_WIDTH} from './_constants';
import {HEADER_HEIGHT} from '../header/_constants';

export const additionalMenuStyles = makeStyles((theme: Theme) => ({
  drawer: {
    zIndex: 100,
    [theme.breakpoints.down('xs')]: {
      height: BOTTOM_DRAWER_HEIGHT,
    },
    [theme.breakpoints.up('sm')]: {
      width: LEFT_DRAWER_WIDTH,
    },
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > .MuiFab-root': {
      [theme.breakpoints.down('xs')]: {
        width: 40,
        height: 40,
      },
      [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
      },
    },
  },
  logo: {
    width: '100%',
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
