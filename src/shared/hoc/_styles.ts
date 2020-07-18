import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../theme';
import {HEADER_HEIGHT} from '../../components/header/_constants';
import {BOTTOM_DRAWER_HEIGHT, LEFT_DRAWER_WIDTH} from './_constants';

export const centeringStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const wrapperStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const backgroundStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      maxWidth: '80%',
    },
  },
  footer: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    position: 'relative',
  },
  imgBox: {
    position: 'fixed',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
  },
}));

export const developmentRibbonStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 100000,
    position: 'fixed',
    top: 30,
    left: -100,
    width: 300,
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(-45deg)',
    fontSize: '1em',
    fontWeight: 600,
    color: COLORS.WHITE,
  },
  background: {
    zIndex: -1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: theme.palette.error.main,
    opacity: 0.7,
  },
}));

const horizontalBreakpoint = 'xs';
const verticalBreakpoint = 'sm';

export const drawerMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down(horizontalBreakpoint)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up(verticalBreakpoint)]: {
      flexDirection: 'row',
    },
  },
  drawer: {
    zIndex: 100,
    [theme.breakpoints.down(horizontalBreakpoint)]: {
      height: BOTTOM_DRAWER_HEIGHT,
    },
    [theme.breakpoints.up(verticalBreakpoint)]: {
      width: LEFT_DRAWER_WIDTH,
    },
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.down(horizontalBreakpoint)]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up(verticalBreakpoint)]: {
      flexDirection: 'column',
    },
    '& .MuiFab-root': {
      margin: theme.spacing(1),
      [theme.breakpoints.down(horizontalBreakpoint)]: {
        width: 40,
        height: 40,
      },
      [theme.breakpoints.up(verticalBreakpoint)]: {
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
