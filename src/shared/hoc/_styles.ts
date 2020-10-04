import {makeStyles, Theme} from '@material-ui/core/styles';

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
    minWidth: '100vw',
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
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    minWidth: '100%',
    minHeight: '100%',
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
    color: theme.palette.error.contrastText,
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

export const additionalMenuStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  rootMenuBottom: {
    flexDirection: 'column',
  },
  rootMenuLeft: {
    flexDirection: 'row-reverse',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
}));

export const flexStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const notificationStyles = makeStyles((theme: Theme) => ({
  variantSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  variantError: {
    backgroundColor: theme.palette.error.main,
  },
  variantInfo: {
    backgroundColor: theme.palette.info.main,
  },
  variantWarning: {
    backgroundColor: theme.palette.warning.main,
  },
}));
