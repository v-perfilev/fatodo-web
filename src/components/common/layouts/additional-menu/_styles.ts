import {makeStyles, Theme} from '@material-ui/core/styles';
import {BOTTOM_DRAWER_HEIGHT, LEFT_DRAWER_WIDTH} from './_constants';
import {HEADER_HEIGHT} from '../header/_constants';

export const additionalMenuStyles = makeStyles((theme: Theme) => ({
  drawer: {
    zIndex: 0,
  },
  drawerLeft: {
    width: LEFT_DRAWER_WIDTH,
  },
  drawerBottom: {
    height: BOTTOM_DRAWER_HEIGHT,
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > .MuiFab-root': {
      width: 50,
      height: 50,
    },
  },
  containerLeft: {
    flexDirection: 'column',
  },
  containerBottom: {
    flexDirection: 'row',
  },
  logo: {
    width: '100%',
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
