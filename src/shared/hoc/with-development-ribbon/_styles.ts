import {makeStyles, Theme} from '@material-ui/core/styles';

export const developmentRibbonStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 1200,
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
