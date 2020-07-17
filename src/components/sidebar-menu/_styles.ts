import {makeStyles, Theme} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../header/_constants';
import {BOTTOM_DRAWER_HEIGHT, LEFT_DRAWER_WIDTH} from './_constants';

export const drawerStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 100,
    [theme.breakpoints.down('sm')]: {
      height: BOTTOM_DRAWER_HEIGHT,
    },
    [theme.breakpoints.up('sm')]: {
      width: LEFT_DRAWER_WIDTH,
    },
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
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

export const containerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  content: {
    flexGrow: 1,
  },
}));
